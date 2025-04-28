from django.urls import path, include
from rest_framework_mongoengine.routers import DefaultRouter
from .views import LoanRepaymentViewSet

router = DefaultRouter()
router.register(r'repayments', LoanRepaymentViewSet, basename='loan-repayment')

urlpatterns = [
    path('', include(router.urls)),
]
