from .views import *
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('username/<str:pk>',getUsername,name="username"),
    path('mess/',mess,name="mess"),
    path('meal/<str:pk>',meal,name="meal"),
    path('update/meal/<str:pk>',updateMeal,name="update_meal"),
    path('member/<str:pk>',member,name="member"),
    path('bills/<str:pk>',bills,name="bills"),
    path('create/bill/',createBill,name="create_bill"),
    path('update/bill/<str:pk>',updateBill,name="update-bill"),
    path('delete/bill/<str:pk>',deleteBill,name="delete-bill"),
    path('amountspend/<str:pk>',amountSpends,name="amount-spend"),
    path('create/spend/<str:pk>',createSpend,name="create_spend"),
    path('create/meal/spend/',createMealSpend,name="create_meal_spend"),
    path('update/spend/<str:pk>',updateSpend,name="update-spend"),
    path('delete/spend/<str:pk>',deleteSpend,name="delete-spend"),
    path('deposit/<str:pk>',mealDeposits,name="meal-deposits"),
    path('deposits/<str:pk>',cashDeposits,name="cash-deposits"),
    path('create/deposit/<str:pk>',createDeposit,name="create_deposit"),
    path('update/deposit/<str:pk>',updateDeposit,name="update-deposit"),
    path('update/meal/deposit/<str:pk>',updateMealDeposit,name="update-meal-deposit"),
    path('delete/deposit/<str:pk>',deleteDeposit,name="delete-deposit"),
    path('check/deposit/<str:pk>/<str:deposit_for>',checkDeposit,name="check-deposit"),
    path('check/spend/<str:pk>/<str:spend_on>',checkSpend,name="check-spend"),
    path('balance/<str:pk>',balance,name="balance"),
    path('monthview/<str:pk>',monthView,name="month-view")
]