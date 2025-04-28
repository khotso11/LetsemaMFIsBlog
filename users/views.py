# views.py

from rest_framework import viewsets, generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import (
    UserSerializer,
    MyTokenObtainPairSerializer,
)

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for listing, retrieving, updating, deleting users.
    (You can lock this down further with permissions later.)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegisterView(generics.CreateAPIView):
    """
    POST /auth/register/ → create a new user.
    """
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


class LoginView(TokenObtainPairView):
    """
    POST /auth/login/ → returns { access, refresh, user }.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = MyTokenObtainPairSerializer
