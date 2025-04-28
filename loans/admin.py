from django.contrib import admin
from django_mongoengine import mongo_admin as mongo_admin
from .models import Loan

from repayments.models import LoanRepayment
admin.site.register(Loan)
mongo_admin.site.register(LoanRepayment)