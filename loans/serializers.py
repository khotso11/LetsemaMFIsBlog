# from rest_framework import serializers
# from core.middleware import get_current_tenant
# from .models import Loan, LoanRepayment
# from users.serializers import UserSerializer

# class LoanRepaymentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = LoanRepayment
#         fields = ['id', 'loan', 'amount_paid', 'payment_date']
#         read_only_fields = ['id', 'payment_date']

# class LoanSerializer(serializers.ModelSerializer):
#     borrower_details = UserSerializer(source='borrower', read_only=True)
#     approver_details = UserSerializer(source='approved_by', read_only=True)
#     total_repaid = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
#     remaining_balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    
#     class Meta:
#         model = Loan
#         fields = '__all__'
#         read_only_fields = ['id', 'applied_at', 'approved_at', 'total_repaid', 
#                             'remaining_balance', 'mfi', 'borrower']

#     def validate(self, data):
#         if self.context['request'].method == 'POST':
#             tenant = get_current_tenant()
#             if not tenant:
#                 raise serializers.ValidationError("A valid tenant context is required to apply for a loan.")
#         return data

# class LoanCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Loan
#         fields = ['borrower', 'amount', 'interest_rate', 'term_months', 
#                   'national_id_document', 'proof_of_payment']
#         extra_kwargs = {
#             'borrower': {'read_only': True},  # Borrower is set automatically
#         }

#     def validate(self, data):
#         tenant = get_current_tenant()
#         if not tenant:
#             raise serializers.ValidationError("A valid tenant context is required to apply for a loan.")
#         return data





from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer
from core.middleware import get_current_tenant
from .models import Loan
from repayments.models import LoanRepayment
from users.serializers import UserSerializer


# -- MongoEngine Document serializer for LoanRepayment --
class LoanRepaymentSerializer(DocumentSerializer):
    class Meta:
        document = LoanRepayment
        fields = ('id', 'loan_id', 'amount_paid', 'payment_date')


# -- Django ORM serializers for Loan --
class LoanSerializer(serializers.ModelSerializer):
    borrower_details  = UserSerializer(source='borrower', read_only=True)
    approver_details  = UserSerializer(source='approved_by', read_only=True)
    total_repaid      = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    remaining_balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    class Meta:
        model = Loan
        fields = '__all__'
        read_only_fields = [
            'id', 'applied_at', 'approved_at',
            'total_repaid', 'remaining_balance',
            'mfi', 'borrower'
        ]

    def validate(self, data):
        if self.context['request'].method == 'POST':
            tenant = get_current_tenant()
            if not tenant:
                raise serializers.ValidationError(
                    "A valid tenant context is required to apply for a loan."
                )
        return data


class LoanCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = [
            'borrower', 'amount', 'interest_rate', 'term_months',
            'national_id_document', 'proof_of_payment'
        ]
        extra_kwargs = {
            'borrower': {'read_only': True},
        }

    def validate(self, data):
        tenant = get_current_tenant()
        if not tenant:
            raise serializers.ValidationError(
                "A valid tenant context is required to apply for a loan."
            )
        return data
