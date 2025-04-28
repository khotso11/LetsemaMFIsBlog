from django.db import models
from django.core.validators import RegexValidator

class MicrofinanceInstitution(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MFI(models.Model):
    """Microfinance Institution model with subdomain support"""
    name = models.CharField(max_length=255, unique=True)
    location = models.CharField(max_length=255, blank=True)
    contact_email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # New fields for subdomain support
    subdomain = models.CharField(
        max_length=63,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$',
                message='Subdomain can only contain lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen.'
            )
        ],
        help_text="Subdomain prefix for the MFI (e.g., 'acme' for 'acme.letsema.com')"
    )
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Microfinance Institution"
        verbose_name_plural = "Microfinance Institutions"