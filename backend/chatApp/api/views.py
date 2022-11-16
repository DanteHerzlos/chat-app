from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.paginator import Paginator
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer, CustomTokenObtainPairSerializer

@api_view(['GET'])
def getRooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRoom(request, pk):
    rooms = Room.objects.get(id=pk)
    serializer = RoomSerializer(rooms, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addRoom(request):
    data = request.data
    room = Room.objects.create(
        name = data
    )
    serializer = RoomSerializer(room, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getMessagesByRoom(request):
    id = request.query_params['id']
    lastMessageId = request.query_params['lastMessageId']
    page = request.query_params['page']
    if(lastMessageId == ''):
        messages = Message.objects.all().filter(room=id).order_by('-created')
    else:
        messages = Message.objects.all().filter(room=id, id__lt=lastMessageId).order_by('-created')
    paginator = Paginator(messages,20)
    page_obj = paginator.get_page(page)
    serializer = MessageSerializer(reversed(page_obj.object_list), many=True)
    data = {
        'items': serializer.data,
        'maxPage': paginator.num_pages
    }
    return Response(data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer