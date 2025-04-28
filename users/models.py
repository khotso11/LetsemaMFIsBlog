from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, phone_number, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, phone_number, password, **extra_fields)

    def create_superuser(self, email, phone_number, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, phone_number, password, **extra_fields)

class User(AbstractUser):
    """Custom user model for Letsema application."""
    ROLE_CHOICES = (
        ('borrower', 'Borrower'),
        ('loan_officer', 'Loan Officer'),
        ('admin', 'Admin'),
    )
    
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=20, unique=True)
    national_id = models.CharField(max_length=50, unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='borrower')
    created_at = models.DateTimeField(auto_now_add=True)
    mfi = models.ForeignKey('mfis.MFI', on_delete=models.SET_NULL, null=True, blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'national_id', 'first_name', 'last_name']
    
    objects = UserManager()
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"