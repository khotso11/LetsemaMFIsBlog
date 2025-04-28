from rest_framework import generics, permissions
from rest_framework.response import Response
from mfis.models import MFI
from mfis.serializers import MFISerializer

class PublicTenantListView(generics.ListAPIView):
    """
    View to list all active MFIs for tenant selection
    Only accessible from the main domain, not from tenant subdomains
    """
    queryset = MFI.objects.filter(is_active=True)
    serializer_class = MFISerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        # Return only public info for MFIs
        return MFI.objects.filter(is_active=True).only(
            'id', 'name', 'subdomain', 'location'
        )
