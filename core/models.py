from django.db import models
from django.db.models.query import QuerySet
from .utils import get_current_tenant

class TenantQuerySet(QuerySet):
    """
    QuerySet that automatically filters by tenant
    """
    def filter_by_tenant(self):
        tenant_id = get_current_tenant()
        if tenant_id:
            return self.filter(mfi_id=tenant_id)
        return self

class TenantManager(models.Manager):
    """
    Manager that automatically filters by tenant
    """
    def get_queryset(self):
        return TenantQuerySet(self.model, using=self._db).filter_by_tenant()

class TenantModel(models.Model):
    """
    Abstract model that all tenant-scoped models should inherit from
    """
    mfi = models.ForeignKey('mfis.MFI', on_delete=models.CASCADE)
    
    # Regular manager that doesn't filter by tenant
    objects_unfiltered = models.Manager()
    
    # Manager that automatically filters by tenant
    objects = TenantManager()
    
    class Meta:
        abstract = True