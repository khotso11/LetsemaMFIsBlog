# serializers.py

from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.middleware import get_current_tenant

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'phone_number', 'national_id',
            'first_name', 'last_name', 'role', 'mfi',
            'created_at', 'password',
        ]
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        tenant = get_current_tenant()
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.mfi = tenant
        user.save()
        return user
 
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customize the response to include user details along with tokens.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
