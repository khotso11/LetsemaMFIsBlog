from rest_framework.routers import DefaultRouter
from .views import MyViewSet

router = DefaultRouter()
router.register(r'my-endpoint', MyViewSet, basename='myviewset')  # Provide a basename

urlpatterns = router.urls