from rest_framework import viewsets, permissions
from .models import MFI
from .serializers import MFISerializer
from core.permissions import IsTenantAdmin

class MFIViewSet(viewsets.ModelViewSet):
    queryset = MFI.objects.all()
    serializer_class = MFISerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only superusers can create or modify MFIs
            self.permission_classes = [permissions.IsAdminUser]
        elif self.action in ['retrieve', 'list']:
            # Admins of the specific MFI can view their MFI details
            self.permission_classes = [permissions.IsAuthenticated, IsTenantAdmin]
        return super().get_permissions()
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return MFI.objects.all()
        elif user.is_authenticated and user.mfi:
            return MFI.objects.filter(id=user.mfi.id)
        return MFI.objects.none()