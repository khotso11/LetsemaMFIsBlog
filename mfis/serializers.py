from rest_framework import serializers
from .models import MFI

class MFISerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()
    tenant_url = serializers.SerializerMethodField()
    
    class Meta:
        model = MFI
        fields = ['id', 'name', 'location', 'contact_email', 'phone_number', 
                  'subdomain', 'is_active', 'created_at', 'user_count', 'tenant_url']
        read_only_fields = ['id', 'created_at', 'user_count', 'tenant_url']
    
    def get_user_count(self, obj):
        return obj.user_set.count()
    
    def get_tenant_url(self, obj):
        from django.conf import settings
        base_domain = getattr(settings, 'BASE_DOMAIN', None)
        if base_domain and obj.subdomain:
            return f"https://{obj.subdomain}.{base_domain}"
        return None