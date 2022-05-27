from tokenize import String
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from rest_framework.response import Response
import datetime
from datetime import date
from datetime import timedelta
from .utils import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUsername(request,pk):
    user = User.objects.get(id =pk)
    username = user.username

    return Response({
        'username':username
    })

@api_view(['GET'])
def checkDeposit(request,pk,*args, **kwargs):
    year = date.today().year
    month = date.today().month
    user = User.objects.get(id = pk)
    mess = user.member.mess
    dp = CashDeposit.objects.filter(mess=mess,user=user,*args, **kwargs,date_created__month__gte=month,date_created__year__gte=year).count()
    if dp == 0:
        deposit = CashDeposit.objects.filter(mess=mess,user=user,*args, **kwargs,date_created__month__gte=month,date_created__year__gte=year)
        serializer = CashDepositSerializer(deposit,many=False)
    elif dp == 1:
        deposit = CashDeposit.objects.get(mess=mess,user=user,*args, **kwargs,date_created__month__gte=month,date_created__year__gte=year)
        serializer = CashDepositSerializer(deposit,many=False)

    return Response(serializer.data)

@api_view(['GET'])
def checkSpend(request,pk,*args, **kwargs):
    year = date.today().year
    month = date.today().month
    user = User.objects.get(id = pk)
    mess = user.member.mess
    am = AmountSpend.objects.filter(mess=mess,user=user,*args, **kwargs,date_created__month__gte=month,date_created__year__gte=year).count()
    if am == 0:
        spend = AmountSpend.objects.filter(mess=mess,user=user,*args, **kwargs,date_created__month__gte=month,date_created__year__gte=year)
        serializer = AmountSpendSerializer(spend,many=False)
    elif am == 1:
        spend = AmountSpend.objects.get(mess=mess,user=user,*args, **kwargs,date_created__month__gte=month,date_created__year__gte=year)
        serializer = AmountSpendSerializer(spend,many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mess(request):
    user = request.user.member
    mess_id = user.mess.id
    mess = Mess.objects.get(id = mess_id)
    members = mess.members.all()
    mess_members = []
    total_spend = 0
    total_meal = 0
    for i in members:
        total_spend += i.member.spend_total
        total_meal += i.member.total_meal
        mess_members.append(i.id)
    
    if total_meal == 0:
        meal_rate = 0
    else: 
        meal_rate = total_spend / total_meal

    return Response({
        'name':mess.name,
        'id':mess.id,
        'members':mess_members,
        'meal_rate':meal_rate,
        'total_meal':total_meal,
    })

@api_view(['GET'])
def meal(request,pk):
    year = date.today().year
    month = date.today().month

    user = User.objects.get(id=pk)
    now = date.today()
    meals = Meals.objects.filter(user = user, date_created__gte = now).count()
    if meals == 0:
        meal = Meals.objects.create(user = user, date_created = now)
        print(meal)
        id = meal.id
        user_id = meal.user.id
    else:
        meal = Meals.objects.get(user = user, date_created__date__gte = now)
        id = meal.id
    user_id = meal.user.username
    profile_pic = user.member.profile_pic.url
    total_meal = user.member.total_meal
    person_spend = user.member.person_spend
    member = meal.user.member

    meal_total = Meals.objects.filter(user=user,date_created__month__gte=month,date_created__year__gte=year)
    mt = meal_total.count()
    ml = 0
    if mt == 0:
        member.total_meal = ml
        member.save()
    else:
        for i in meal_total:
            ml += i.todays_meal
            member.total_meal = ml
            member.save()

    meal_rate = getMealRate(member.mess)
    member.person_spend = meal_rate * member.total_meal
    member.save()
    

    return Response({
        'id':id,
        'user':user_id,
        'todays_meal':meal.todays_meal,
        'total_meal':total_meal,
        'person_spend':person_spend,
        'date_created':meal.date_created,
        'profile_pic':profile_pic,
    })

@api_view(['PUT'])
def updateMeal(request,pk):
    year = date.today().year
    month = date.today().month

    data = request.data.get('todays_meal')
    meal = Meals.objects.get(id=pk)
    meal.todays_meal = data
    user = meal.user
    member = meal.user.member

    meal_total = Meals.objects.filter(user=user,date_created__month__gte=month,date_created__year__gte=year)
    mt = meal_total.count()
    ml = 0
    if mt == 0:
        member.total_meal = ml
        member.save()
    else:
        for i in meal_total:
            ml += i.todays_meal
            member.total_meal = ml
            member.save()

    meal.save()

    return Response({
        'id':meal.id,
        'user':meal.user.username,
        'todays_meal':meal.todays_meal,
        'total_meal':meal.user.member.total_meal,
        'person_spend':meal.user.member.person_spend,
        'date_created':meal.date_created,
        'profile_pic':meal.user.member.profile_pic.url,
    })



@api_view(['GET'])
def member(request,pk):
    user = User.objects.get(id = pk)
    member = Member.objects.get(user=user)
    serializer = MemberSerializer(member)
    return Response(
        serializer.data
    )

@api_view(['GET'])
def bills(request,pk):
    mess = Mess.objects.get(id = pk)
    bills = Bills.objects.filter(mess=mess)
    serializer = BillsSerializer(bills, many=True)
    return Response(
        serializer.data
    )

@api_view(['PUT'])
def updateBill(request,pk):
    data = request.data 
    bill = Bills.objects.get(id = pk)
    serializer = BillsSerializer(instance = bill, data = data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def createBill(request):
    data = request.data
    mess = request.user.member.mess
    bill = Bills.objects.create( mess = mess,
        bill_on=data['bill_on'],
        amount = data['amount']
    )
    serializer = BillsSerializer(bill,many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteBill(request,pk):
    bill = Bills.objects.get(id = pk)
    bill_on = bill.bill_on
    amountspends =  AmountSpend.objects.filter(mess=bill.mess , spend_on = bill_on)
    for i in amountspends:
        i.delete()
    bill.delete()
    return Response('Bill was deleted!')

@api_view(['GET'])
def amountSpends(request,pk):
    year = date.today().year
    month = date.today().month
    mess = Mess.objects.get(id = pk)
    spends = AmountSpend.objects.filter(mess=mess,date_created__month__gte=month,date_created__year__gte=year)
    serializer = AmountSpendSerializer(spends, many=True)
    return Response(
        serializer.data
    )

@api_view(['PUT'])
def updateSpend(request,pk):
    data = request.data
    spend = AmountSpend.objects.get(id = pk)
    data['user'] = spend.user.id
    serializer = AmountSpendSerializer(instance = spend, data = data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def createSpend(request,pk):
    user = User.objects.get(id = pk)
    data = request.data
    mess = request.user.member.mess
    spend = AmountSpend.objects.create( mess = mess, user = user,
        spend_on=data['spend_on'],
        amount = data['amount']
    )
    serializer = AmountSpendSerializer(spend,many = False)
    return Response(serializer.data)

@api_view(['POST'])
def createMealSpend(request):
    user = request.user
    mess = user.member.mess
    spend = AmountSpend.objects.create(user = user, mess = mess, spend_on = "Meal Market")
    data = request.data
    amounts = data['amount-list']
    list = data['obj-list']
    total_amount = 0
    all_list = ""
    all_amounts = ""
    for i in list:
        all_list += (str(i) + ";")
    spend.list_spend = all_list

    for i in amounts:
        all_amounts += (str(i) + ";")
        total_amount += int(i)
    spend.amounts = all_amounts
    spend.amount = total_amount

    spend.save()

    return Response("Done")


@api_view(['DELETE'])
def deleteSpend(request,pk):
    spend = AmountSpend.objects.get(id = pk)
    spend.delete()
    return Response('Spend was deleted!')

@api_view(['GET'])
def mealDeposits(request,pk):
    year = date.today().year
    month = date.today().month
    user = User.objects.get(id = pk)
    mess =  user.member.mess
    deposit_for = "Meal"
    dp = CashDeposit.objects.filter(
        mess = mess, 
        user = user,
        deposit_for = deposit_for,
        date_created__month__gte=month,
        date_created__year__gte=year
    ).count()
    if dp == 0:
        deposit = CashDeposit.objects.create(
            mess = mess, 
            user = user,
            deposit_for = deposit_for
        )
    else:
        deposit = CashDeposit.objects.get(
            mess = mess, 
            user = user,
            deposit_for = deposit_for,
            date_created__month__gte=month,
            date_created__year__gte=year
        )
    all_dp = CashDeposit.objects.filter(
        mess = mess,
        user = user,
        date_created__month__gte=month,
        date_created__year__gte=year
    )
    total_deposit = 0
    for i in all_dp:
        total_deposit += i.amount
    user_id = user.username
    profile_pic = user.member.profile_pic.url
    
    return Response({
        'id':deposit.id,
        'user':user_id,
        'meal_deposit':deposit.amount,
        'total_deposit': total_deposit,
        'date_created':deposit.date_created,
        'profile_pic':profile_pic,
    })

@api_view(['GET'])
def cashDeposits(request,pk):
    year = date.today().year
    month = date.today().month
    mess = Mess.objects.get(id = pk)
    deposits = CashDeposit.objects.filter(mess=mess,date_created__month__gte=month,date_created__year__gte=year)
    serializer = CashDepositSerializer(deposits, many=True)
    return Response(
        serializer.data
    )

@api_view(['PUT'])
def updateDeposit(request,pk):
    data = request.data
    deposit = CashDeposit.objects.get(id = pk)
    data['mess'] = deposit.mess.id
    data['user'] = deposit.user.id
    serializer = CashDepositSerializer(instance = deposit, data = data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['PUT'])
def updateMealDeposit(request,pk):
    amount = request.data
    deposit = CashDeposit.objects.get(id = pk)
    deposit.amount += int(amount)
    deposit.save()
    serializer = CashDepositSerializer(deposit)
    
    return Response(serializer.data)

@api_view(['POST'])
def createDeposit(request,pk):
    user = User.objects.get(id = pk)
    data = request.data

    mess = request.user.member.mess
    deposit = CashDeposit.objects.create( mess = mess,user=user,
        deposit_for=data['deposit_for'],
        amount = data['amount']
    )
    serializer = CashDepositSerializer(deposit,many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteDeposit(request,pk):
    deposit = CashDeposit.objects.get(id = pk)
    deposit.delete()
    return Response('Deposit was deleted!')

@api_view(['GET'])
def balance(request,pk):
    mess = Mess.objects.get(id = pk)
    members = mess.members.all()
    balance = []
    for i in members:
        user_balance = getBalance(i)
        balance.append(user_balance)
    
    return Response(balance)

@api_view(['POST'])
def monthView(request,pk):
    mealsheet = []
    cashdeposit = []
    amountspend = []
    bill = []
    usertotalmeal = []
    usertotaldeposit = []
    totalspend = 0
    
    data = request.data
    date_from = datetime.datetime.strptime(data['date_from'], '%Y-%m-%d')
    date_to = datetime.datetime.strptime(data['date_to'], '%Y-%m-%d')
    delta = date_to - date_from

    mess = Mess.objects.get(id = pk)
    members = mess.members.all()

    for i in members:
        usermeal = getUserTotalMeal(date_from,date_to,i)
        usertotalmeal.append(usermeal)
        userdeposit = getUserTotalDeposit(date_from,date_to,i,mess)
        usertotaldeposit.append(userdeposit)

    for i in range(delta.days + 1):
        date1 = (date_from + timedelta(days=i)).strftime('%Y-%m-%d')
        date2 = (date_from + timedelta(days=i+1)).strftime('%Y-%m-%d')
        datemeal = createMealSheet(date1,date2,members)
        mealsheet.append(datemeal)
        

    cashdeposits = CashDeposit.objects.filter(mess=mess, date_created__gte = date_from, date_created__lte = date_to)
    for i in cashdeposits:
        deposit = getCashDeposit(i.id)
        cashdeposit.append(deposit)

    amountspends = AmountSpend.objects.filter(mess=mess, date_created__gte = date_from, date_created__lte = date_to)
    for i in amountspends:
        if i.spend_on == "Meal Market":
            totalspend += i.amount
        spend = getAmountSpend(i.id)
        amountspend.append(spend)

    bills = Bills.objects.filter(mess=mess)
    for i in bills:
        s_bill = getBill(i.id)
        bill.append(s_bill)


    return Response({
        'mealsheet':mealsheet,
        'cashdeposit':cashdeposit,
        'amountspend':amountspend,
        'bill':bill,
        'usertotalmeal':usertotalmeal,
        'totalspend':totalspend,
        'usertotaldeposit':usertotaldeposit
    })
