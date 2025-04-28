from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoanViewSet, LoanRepaymentViewSet

router = DefaultRouter()
router.register(r'', LoanViewSet, basename='loan')  # Register LoanViewSet
router.register(r'repayments', LoanRepaymentViewSet, basename='loan-repayment')  # Register LoanRepaymentViewSet

urlpatterns = [
    path('', include(router.urls)),  # Include all routes from the router
]