import threading

# Initialize thread-local storage
_thread_local = threading.local()

def get_current_tenant():
    """Get the current tenant ID from thread local storage."""
    return getattr(_thread_local, 'tenant', None)

def get_current_tenant_obj():
    """Get the current tenant object from thread local storage."""
    return getattr(_thread_local, 'tenant_obj', None)