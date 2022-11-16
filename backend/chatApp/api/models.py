import uuid
from django.db import models
from django.contrib.auth.models import User


class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=False, blank=False, max_length=50)
    def __str__(self):
        return self.name

class Message(models.Model):
    body = models.TextField(null=False, blank=False)
    room = models.ForeignKey(Room, on_delete=models.RESTRICT)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)   

    def __str__(self):
        return self.body[0:50]