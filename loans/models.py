# from django.db import models
# from core.models import TenantModel
# from users.models import User
# from mfis.models import MFI

# def user_directory_path(instance, filename):
#     # Files will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return f'loans/loan_{instance.id}/{filename}'

# class Loan(TenantModel):
#     """Loan model with tenant isolation"""
#     LOAN_STATUS_CHOICES = (
#         ('pending', 'Pending'),
#         ('approved', 'Approved'),
#         ('rejected', 'Rejected'),
#         ('disbursed', 'Disbursed'),
#         ('repaid', 'Repaid'),
#     )
    
#     borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans')
#     mfi = models.ForeignKey(MFI, on_delete=models.CASCADE, related_name='loans')
#     amount = models.DecimalField(max_digits=15, decimal_places=2)
#     interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
#     term_months = models.PositiveIntegerField()
#     status = models.CharField(max_length=10, choices=LOAN_STATUS_CHOICES, default='pending')
#     national_id_document = models.FileField(upload_to=user_directory_path, blank=True, null=True)
#     proof_of_payment = models.FileField(upload_to=user_directory_path, blank=True, null=True)
#     applied_at = models.DateTimeField(auto_now_add=True)
#     approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, 
#                                      null=True, blank=True, related_name='approved_loans')
#     approved_at = models.DateTimeField(null=True, blank=True)
    
#     def __str__(self):
#         return f"Loan #{self.id} - {self.borrower.email} - {self.amount}"
    
#     @property
#     def total_repaid(self):
#         """Calculate the total amount repaid on this loan"""
#         return sum(repayment.amount_paid for repayment in self.repayments.all())
    
#     @property
#     def remaining_balance(self):
#         """Calculate the remaining balance on this loan"""
#         total_with_interest = self.amount * (1 + (self.interest_rate / 100))
#         return max(0, total_with_interest - self.total_repaid)
    
#     @property
#     def is_fully_repaid(self):
#         """Check if the loan is fully repaid"""
#         return self.remaining_balance <= 0

# class LoanRepayment(TenantModel):
#     """Loan repayment model with tenant isolation"""
#     loan = models.ForeignKey(Loan, on_delete=models.CASCADE, related_name='repayments')
#     amount_paid = models.DecimalField(max_digits=15, decimal_places=2)
#     payment_date = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"Repayment for Loan #{self.loan.id} - {self.amount_paid}"
    
#     def save(self, *args, **kwargs):
#         # Ensure the repayment belongs to the same MFI as the loan
#         if not self.mfi_id:
#             self.mfi_id = self.loan.mfi_id
#         super().save(*args, **kwargs)





# from django.db import models
# from core.models import TenantModel
# from users.models import User
# from mfis.models import MFI

# from mongoengine import Document, IntField, DecimalField, DateTimeField
# from datetime import datetime
# from repayments.models import LoanRepayment 



# def user_directory_path(instance, filename):
#     # Files will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return f'loans/loan_{instance.id}/{filename}'


# class Loan(TenantModel):
#     """Loan model with tenant isolation"""
#     LOAN_STATUS_CHOICES = (
#         ('pending', 'Pending'),
#         ('approved', 'Approved'),
#         ('rejected', 'Rejected'),
#         ('disbursed', 'Disbursed'),
#         ('repaid', 'Repaid'),
#     )
    
#     borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans')
#     mfi = models.ForeignKey(MFI, on_delete=models.CASCADE, related_name='loans')
#     amount = models.DecimalField(max_digits=15, decimal_places=2)
#     interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
#     term_months = models.PositiveIntegerField()
#     status = models.CharField(max_length=10, choices=LOAN_STATUS_CHOICES, default='pending')
#     national_id_document = models.FileField(upload_to=user_directory_path, blank=True, null=True)
#     proof_of_payment = models.FileField(upload_to=user_directory_path, blank=True, null=True)
#     applied_at = models.DateTimeField(auto_now_add=True)
#     approved_by = models.ForeignKey(
#         User,
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name='approved_loans'
#     )
#     approved_at = models.DateTimeField(null=True, blank=True)

#     def __str__(self):
#         return f"Loan #{self.id} - {self.borrower.email} - {self.amount}"  

#     @property
#     def total_repaid(self):
#         """Calculate the total amount repaid on this loan"""
#         return sum(repayment.amount_paid for repayment in self.repayments.all())

#     @property
#     def remaining_balance(self):
#         """Calculate the remaining balance on this loan"""
#         total_with_interest = self.amount * (1 + (self.interest_rate / 100))
#         return max(0, total_with_interest - self.total_repaid)

#     @property
#     def is_fully_repaid(self):
#         """Check if the loan is fully repaid"""
#         return self.remaining_balance <= 0


# # class LoanRepayment(Document):
#     """Loan repayment stored in MongoDB via MongoEngine"""
#     loan_id = IntField(required=True)        # references Django Loan.id
#     amount_paid = DecimalField(required=True, precision=2)
#     payment_date = DateTimeField(default=datetime.utcnow)

#     meta = {
#         'collection': 'loan_repayment',
#         'indexes': ['loan_id'],
#     }

#     def __str__(self):
#         return f"Repayment for Loan #{self.loan_id} - {self.amount_paid}"


from django.db import models
from core.models import TenantModel
from users.models import User
from mfis.models import MFI

def user_directory_path(instance, filename):
    # Files will be uploaded to MEDIA_ROOT/loans/loan_<id>/<filename>
    return f'loans/loan_{instance.id}/{filename}'

class Loan(TenantModel):
    """Loan model with tenant isolation"""
    LOAN_STATUS_CHOICES = (
        ('pending',   'Pending'),
        ('approved',  'Approved'),
        ('rejected',  'Rejected'),
        ('disbursed', 'Disbursed'),
        ('repaid',    'Repaid'),
    )
    
    borrower             = models.ForeignKey(
                              User,
                              on_delete=models.CASCADE,
                              related_name='loans'
                           )
    mfi                  = models.ForeignKey(
                              MFI,
                              on_delete=models.CASCADE,
                              related_name='loans'
                           )
    amount               = models.DecimalField(max_digits=15, decimal_places=2)
    interest_rate        = models.DecimalField(max_digits=5, decimal_places=2)
    term_months          = models.PositiveIntegerField()
    status               = models.CharField(
                              max_length=10,
                              choices=LOAN_STATUS_CHOICES,
                              default='pending'
                           )
    national_id_document = models.FileField(
                              upload_to=user_directory_path,
                              blank=True,
                              null=True
                           )
    proof_of_payment     = models.FileField(
                              upload_to=user_directory_path,
                              blank=True,
                              null=True
                           )
    applied_at           = models.DateTimeField(auto_now_add=True)
    approved_by          = models.ForeignKey(
                              User,
                              on_delete=models.SET_NULL,
                              null=True,
                              blank=True,
                              related_name='approved_loans'
                           )
    approved_at          = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Loan #{self.id} - {self.borrower.email} - {self.amount}"

    @property
    def total_repaid(self):
        """
        Calculate the total amount repaid on this loan
        by summing all LoanRepayment docs in the repayments app.
        """
        from repayments.models import LoanRepayment
        return sum(
            r.amount_paid
            for r in LoanRepayment.objects(loan_id=self.id)
        )

    @property
    def remaining_balance(self):
        """
        Calculate remaining balance based on amount, interest, and repayments.
        """
        total_with_interest = self.amount * (1 + (self.interest_rate / 100))
        return max(0, total_with_interest - self.total_repaid)

    @property
    def is_fully_repaid(self):
        """Return True if remaining_balance is zero or less."""
        return self.remaining_balance <= 0
