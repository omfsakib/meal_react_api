from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from rest_framework.response import Response
from datetime import date



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
        meal = Meals.objects.create(user = user)
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
