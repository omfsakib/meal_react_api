from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mess
        fields = '__all__'

class MealsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meals
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class BillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bills
        fields = '__all__'

class AmountSpendSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmountSpend
        fields = '__all__'

class CashDepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashDeposit
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'