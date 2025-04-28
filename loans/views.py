from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from core.middleware import get_current_tenant  # Updated to use middleware
from .models import Loan
from repayments.models import LoanRepayment
from .serializers import LoanSerializer, LoanCreateSerializer, LoanRepaymentSerializer
from mfis.models import MFI
from rest_framework_simplejwt.authentication import JWTAuthentication

class LoanViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing loans.
    """
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]  # Require authentication
    filterset_fields = ['status', 'borrower']
    search_fields = ['borrower__first_name', 'borrower__last_name', 'borrower__email']
    ordering_fields = ['applied_at', 'amount', 'status']

    def get_queryset(self):
        """Filter loans by current tenant"""
        tenant = get_current_tenant()
        if tenant:
            return Loan.objects.filter(mfi=tenant)
        return Loan.objects.none()

    def perform_create(self, serializer):
        """
        Automatically set the tenant (mfi_id) and borrower during loan creation.
        Ensure user is authenticated before creating loan.
        """
        if not self.request.user.is_authenticated:
            raise serializers.ValidationError({
                "non_field_errors": ["You must be logged in to create a loan."]
            })

        tenant = get_current_tenant()
        if not tenant:
            try:
                tenant = MFI.objects.first()
                if not tenant:
                    raise serializers.ValidationError({
                        "non_field_errors": ["No MFI found in the system."]
                    })
            except Exception as e:
                raise serializers.ValidationError({
                    "non_field_errors": ["A valid tenant context is required to apply for a loan."]
                })
        
        serializer.save(mfi=tenant, borrower=self.request.user)

class LoanRepaymentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing loan repayments.
    """
    http_method_names = ['get', 'post']
    authentication_classes = [JWTAuthentication]
    queryset = LoanRepayment.objects.all()

    serializer_class = LoanRepaymentSerializer

    #permission_classes = []  # Disable authentication and authorization
    filterset_fields = ['loan']
    
    def get_queryset(self):
        """
        Filter repayments by the current tenant.
        """
        tenant = get_current_tenant()  # Updated to use middleware
        if tenant:
            return LoanRepayment.objects.filter(mfi=tenant)
        return LoanRepayment.objects.none()
    
    def perform_create(self, serializer):
        """
        Automatically set the tenant (mfi_id) during repayment creation.
        """
        loan = Loan.objects.get(pk=serializer.validated_data['loan'].id)
        serializer.save(mfi=loan.mfi)
        
        if loan.is_fully_repaid:
            loan.status = 'repaid'
            loan.save()