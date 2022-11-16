from django.urls import re_path, path
from . import consumers

websocket_urlpatterns = [
    path('ws/socket-server/<str:roomId>/', consumers.ChatConsumer.as_asgi())
]