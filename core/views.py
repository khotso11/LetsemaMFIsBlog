from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import MyModel
from .serializers import MyModelSerializer

class MyViewSet(ModelViewSet):
    queryset = MyModel.objects.all()  # Define the queryset
    serializer_class = MyModelSerializer

# Create your views here.
