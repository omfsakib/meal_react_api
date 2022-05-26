from .models import *
from datetime import date

def getMealRate(mess_id):
    year = date.today().year
    month = date.today().month
    total_meal = 0
    total_spend = 0
    meal_rate = 0

    mess = mess_id
    members =  mess.members.all()
    for i in members:
        total_meal += i.member.total_meal
    
    spend_objects = AmountSpend.objects.filter(mess=mess,spend_on="Meal Market",date_created__month__gte=month,date_created__year__gte=year)
    for i in spend_objects:
        total_spend += i.amount

    meal_rate = total_spend / total_meal

    return meal_rate

def getSpendTotal(member_id):
    year = date.today().year
    month = date.today().month
    total_spend = 0
    member = member_id
    spend_objects = AmountSpend.objects.filter(user=member,date_created__month__gte=month,date_created__year__gte=year)
    for i in spend_objects:
        if i.spend_on == "Meal Market":
            total_spend += 0
        else:
            total_spend += i.amount
    total_spend += member.member.person_spend

    member.member.spend_total = total_spend
    member.member.save()

    return total_spend

def getTotalDeposit(member_id):
    year = date.today().year
    month = date.today().month
    total_deposit = 0
    member = member_id
    deposit_objects = CashDeposit.objects.filter(user=member,date_created__month__gte=month,date_created__year__gte=year)
    for i in deposit_objects:
        total_deposit += i.amount

    member.member.deposit = total_deposit
    member.member.save()

    return total_deposit

def getBalance(member_id):
    member = member_id
    total_spend = getSpendTotal(member_id)
    total_deposit = getTotalDeposit(member_id)

    balance = total_deposit - total_spend

    member.member.balance = balance
    member.member.save()

    return ({
        "member" : member_id.username,
        "total_spend": total_spend,
        "total_deposit":total_deposit,
        "balance":balance
    })

def getCashDeposit(deposit_id):
    cashdeposit = CashDeposit.objects.get(id = deposit_id)

    return ({
        "id" : cashdeposit.id,
        "mess" : cashdeposit.mess.name,
        "user": cashdeposit.user.username,
        "deposit_for":cashdeposit.deposit_for,
        "amount":cashdeposit.amount,
        "date_created":cashdeposit.date_created
    })

def getAmountSpend(spend_id):
    amountspend = AmountSpend.objects.get(id = spend_id)

    return ({
            "id" : amountspend.id,
            "mess" : amountspend.mess.name,
            "user": amountspend.user.username,
            "spend_on":amountspend.spend_on,
            "list_spend":amountspend.list_spend,
            "amounts":amountspend.amounts,
            "amount":amountspend.amount,
            "date_created":amountspend.date_created,
        })

def getBill(bill_id):
    bill = Bills.objects.get(id = bill_id)

    return ({
            "id" : bill.id,
            "mess" : bill.mess.name,
            "bill_on":bill.bill_on,
            "amount":bill.amount,
            "date_created":bill.date_created,
        })

def getMeal(meal_id):
    meal = Meals.objects.get(id = meal_id)

    return ({
            "id" : meal.id,
            "user" : meal.user.username,
            "todays_meal":meal.todays_meal,
            "date_created":meal.date_created,
        })

def createMealSheet(date_from,date_to,members):
    datesheet = []
    for i in members:
        meals = Meals.objects.filter(user = i, date_created__gt = date_from, date_created__lt = date_to)
        total_meals = meals.count()
        if total_meals > 0:
            meal = Meals.objects.get(user = i, date_created__gt = date_from, date_created__lt = date_to)
            json_meal = getMeal(meal.id) 
            datesheet.append(json_meal)
        else:
            meal = Meals.objects.create(user = i, date_created = date_to)
            json_meal = getMeal(meal.id) 
            datesheet.append(json_meal)
    
    return ({
        date_from : datesheet
    })
                
 
