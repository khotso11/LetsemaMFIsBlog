from rest_framework import permissions
from .middleware import get_current_tenant

class IsTenantAdmin(permissions.BasePermission):
    """
    Permission to only allow admins of the current tenant to access a view
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin' and request.user.mfi_id == get_current_tenant()

class IsTenantLoanOfficer(permissions.BasePermission):
    """
    Permission to only allow loan officers of the current tenant to access a view
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'loan_officer' and request.user.mfi_id == get_current_tenant()

class IsTenantMember(permissions.BasePermission):
    """
    Permission to only allow users who belong to the current tenant
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.mfi_id == get_current_tenant()