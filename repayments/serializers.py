from rest_framework_mongoengine.serializers import DocumentSerializer
from core.middleware import get_current_tenant
from .models import LoanRepayment
from loans.models import Loan

# -- MongoEngine Document serializer for LoanRepayment --
class LoanRepaymentSerializer(DocumentSerializer):
    class Meta:
        # DRF needs this
        model = LoanRepayment
        # and MongoEngine needs this
        document = LoanRepayment
        fields = ('id', 'loan_id', 'amount_paid', 'payment_date')
