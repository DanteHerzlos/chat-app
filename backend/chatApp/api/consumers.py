import json 
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from datetime import datetime

from .models import Message,Room, User


class ChatConsumer(WebsocketConsumer):
    def create_message(self, message, userId):
        room = Room.objects.get(id=self.room_group_name)
        user = User.objects.get(id=userId)
        new_msg = Message.objects.create(body=message, room=room, user=user)
        new_msg.save()
        return {
            'id': new_msg.id, 
            'message': new_msg.body, 
            'date': str(new_msg.created),   
            'userId': new_msg.user.id
            }

    def connect(self):
        roomId =self.scope['url_route']['kwargs']['roomId']
        self.room_group_name = roomId
        channel = self.channel_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            channel
        )
        members = len(self.channel_layer.groups.get(self.room_group_name, {}).items())
        self.accept()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'join_to_chat',
                'members': members
            } 
        )

    def join_to_chat(self, event):
        members = event['members']
        
        self.send(text_data=json.dumps({    
            'type': 'join',
            'members': members
        }))


    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        userId = text_data_json['userId']
        username = text_data_json['username']
        tempId = text_data_json['tempId']
        members = len(self.channel_layer.groups.get(self.room_group_name, {}).items())
        new_msg = self.create_message(message, userId)
 
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_message',
                'message': new_msg['message'],
                'username': username,
                'date': new_msg['date'],
                'userId': new_msg['userId'],
                'id': new_msg['id'],
                'tempId': tempId,
                'members': members
            } 
        )

    

    def send_message(self, event):
        id = event['id']
        date = event['date']
        message = event['message']
        username = event['username']
        userId = event['userId']
        tempId = event['tempId']
        members = event['members']
        self.send(text_data=json.dumps({    
            'type': 'chat',
            'message': message,
            'username': username,
            'date': date,
            'userId': userId,
            'id': id,
            'tempId': tempId,
            'members': members
        }))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, 
            self.channel_name
        )