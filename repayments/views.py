from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework_mongoengine import viewsets as me_viewsets
from core.middleware import get_current_tenant
from loans.models import Loan
from .models import LoanRepayment
from .serializers import LoanRepaymentSerializer

class LoanRepaymentViewSet(me_viewsets.ModelViewSet):
    """
    ViewSet for managing loan repayments stored in MongoDB via MongoEngine.
    """
    authentication_classes = [JWTAuthentication]
    http_method_names = ['get', 'post']
    serializer_class = LoanRepaymentSerializer

    # Only use DRF’s built-in filters (DjangoFilterBackend removed)
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('loan_id',)
    ordering_fields = ('payment_date',)

    def get_queryset(self):
        """
        Return only those repayments whose loan belongs to the current tenant.
        """
        tenant = get_current_tenant()
        if not tenant:
            return LoanRepayment.objects.none()
        # gather all loan IDs for this tenant
        loan_ids = Loan.objects.filter(mfi=tenant).values_list('id', flat=True)
        return LoanRepayment.objects(loan_id__in=list(loan_ids))

    def perform_create(self, serializer):
        """
        Save a new repayment, then update the Django Loan status if fully repaid.
        """
        loan_id = serializer.validated_data['loan_id']
        repayment = serializer.save(loan_id=loan_id)

        try:
            loan = Loan.objects.get(pk=loan_id)
            if loan.is_fully_repaid:
                loan.status = 'repaid'
                loan.save()
        except Loan.DoesNotExist:
            pass

    def create(self, request, *args, **kwargs):
        """
        Override to return the created document in the response with HTTP 201.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
