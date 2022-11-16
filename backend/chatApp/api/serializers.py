from rest_framework.serializers import ModelSerializer  
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Room, Message

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']


class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class MessageSerializer(ModelSerializer):
    user = UserSerializer( many=False, read_only=True)
    class Meta:
        model = Message
        fields = '__all__'
        

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

