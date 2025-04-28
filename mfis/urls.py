from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MFIViewSet

router = DefaultRouter()
router.register(r'', MFIViewSet)

urlpatterns = [
    path('', include(router.urls)),
]