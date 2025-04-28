# from threading import local
# import re
# from django.conf import settings
# from django.http import Http404
# from mfis.models import MFI
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.exceptions import InvalidToken
# from rest_framework.exceptions import AuthenticationFailed
# from django.utils.functional import SimpleLazyObject
# from rest_framework.authtoken.models import Token
# from core.utils import _thread_local
# import threading 
# from django.http import HttpResponseForbidden

# # Thread-local storage for tenant context
# _tenant_context = local()

# def get_current_tenant():
#     """Get the current tenant from thread-local storage."""
#     return getattr(_tenant_context, 'tenant', None)

# def set_current_tenant(tenant):
#     """Set the current tenant in thread-local storage."""
#     _tenant_context.tenant = tenant

# class TenantMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Try to get tenant from subdomain or header
#         tenant_id = request.headers.get('X-Tenant-ID',2)  # Default to tenant ID 1 for testing
        
#         try:
#             # Get the MFI instance
#             tenant = MFI.objects.get(id=tenant_id)
#             set_current_tenant(tenant)
#         except MFI.DoesNotExist:
#             set_current_tenant(None)

#         response = self.get_response(request)
#         return response

# class JWTMiddleware:
#     """
#     Middleware to authenticate users using JWT tokens.
#     """

#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         def get_user():
#             try:
#                 # Use JWTAuthentication to validate the token
#                 jwt_auth = JWTAuthentication()
#                 user, token = jwt_auth.authenticate(request)
#                 return user
#             except AuthenticationFailed:
#                 return None

#         request.user = SimpleLazyObject(get_user)
#         return self.get_response(request)

# class TokenMiddleware:
#     def __call__(self, request):
#         try:
#             token = request.headers.get('Authorization').split(' ')[1]
#             token_obj = Token.objects.get(key=token)  # This will fail if Token is not used
#             request.user = token_obj.user
#         except Token.DoesNotExist:
#             request.user = None




from threading import local
import re
from django.conf import settings
from django.http import Http404, HttpResponseForbidden
from mfis.models import MFI
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed
from django.utils.functional import SimpleLazyObject
from rest_framework.authtoken.models import Token

# Thread-local storage for tenant context
_tenant_context = local()

def get_current_tenant():
    """Get the current tenant from thread-local storage."""
    return getattr(_tenant_context, 'tenant', None)

def set_current_tenant(tenant):
    """Set the current tenant in thread-local storage."""
    _tenant_context.tenant = tenant

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        tenant = None

        # 1) Try explicit header first
        header_val = request.headers.get('X-Tenant-ID')
        if header_val is not None:
            try:
                tenant = MFI.objects.get(id=int(header_val))
            except (ValueError, MFI.DoesNotExist):
                tenant = None

        # 2) Fall back to subdomain if no valid header tenant
        if tenant is None:
            host = request.get_host().split(':', 1)[0]  # strip port
            parts = host.split('.')
            if parts:
                subdomain = parts[0]
                try:
                    tenant = MFI.objects.get(subdomain=subdomain)
                except MFI.DoesNotExist:
                    tenant = None

        # 3) Set (or clear) the current tenant context
        set_current_tenant(tenant)

        return self.get_response(request)

class JWTMiddleware:
    """
    Middleware to authenticate users using JWT tokens.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        def get_user():
            try:
                jwt_auth = JWTAuthentication()
                user, token = jwt_auth.authenticate(request)
                return user
            except AuthenticationFailed:
                return None

        request.user = SimpleLazyObject(get_user)
        return self.get_response(request)

class TokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = None
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                token_key = auth_header.split(' ')[1]
                token_obj = Token.objects.get(key=token_key)
                user = token_obj.user
            except (IndexError, Token.DoesNotExist):
                user = None

        request.user = user
        return self.get_response(request)
