from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('rooms/', views.getRooms, name='rooms'),
    path('rooms/create/', views.addRoom, name='create-room'),
    path('rooms/<str:pk>', views.getRoom, name='room'),
    path('messages/room/', views.getMessagesByRoom, name='messages'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
    