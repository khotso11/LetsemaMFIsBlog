from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import PublicTenantListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/mfis/', include('mfis.urls')),
    path('api/loans/', include('loans.urls')),
    path('api/repayments/', include('repayments.urls')),
    path('api/tenants/', PublicTenantListView.as_view(), name='tenant-list'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)