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


