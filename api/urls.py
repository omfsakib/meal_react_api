from .views import *
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('mess/',mess,name="mess"),
    path('meal/<str:pk>',meal,name="meal"),
    path('update/meal/<str:pk>',updateMeal,name="update_meal"),
    path('member/<str:pk>',member,name="member")
]