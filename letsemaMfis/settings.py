# # from pathlib import Path
# # from decouple import config
# # from datetime import timedelta

# # # BASE_DIR setup
# # BASE_DIR = Path(__file__).resolve().parent.parent

# # # SECURITY
# # SECRET_KEY = config('SECRET_KEY', default='django-insecure-j24*un!#5lhbxt8_6m3w!1w_@nz#j71c6e1+xa6*l(u0wd!y25')
# # DEBUG      = config('DEBUG', default=True, cast=bool)
# # ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*').split(',')

# # # APPS
# # INSTALLED_APPS = [
# #     'users',
# #     'django.contrib.admin',
# #     'django.contrib.auth',
# #     'django.contrib.contenttypes',
# #     'django.contrib.sessions',
# #     'django.contrib.messages',
# #     'django.contrib.staticfiles',

# #     # REST
# #     'rest_framework',
# #     'rest_framework_simplejwt',
# #     'rest_framework_simplejwt.token_blacklist',
# #     'django_filters',
# #     'corsheaders',

# #     # Project
# #     'core',
# #     'mfis',
# #     'loans',
# # ]

# # MIDDLEWARE = [
# #     'django.middleware.security.SecurityMiddleware',
# #     'corsheaders.middleware.CorsMiddleware',

# #     'django.contrib.sessions.middleware.SessionMiddleware',
# #     'django.middleware.common.CommonMiddleware',
# #     'django.middleware.csrf.CsrfViewMiddleware',
# #     'django.contrib.auth.middleware.AuthenticationMiddleware',
# #     'django.contrib.messages.middleware.MessageMiddleware',
# #     'django.middleware.clickjacking.XFrameOptionsMiddleware',

# #     'core.middleware.TenantMiddleware',
# # ]

# # ROOT_URLCONF = 'letsemaMfis.urls'
# # LETSEMA_TENANT_DOMAIN = config('LETSEMA_TENANT_DOMAIN', default='kkfinance.local')

# # TEMPLATES = [
# #     {
# #         'BACKEND': 'django.template.backends.django.DjangoTemplates',
# #         'DIRS': [],
# #         'APP_DIRS': True,
# #         'OPTIONS': {
# #             'context_processors': [
# #                 'django.template.context_processors.request',
# #                 'django.contrib.auth.context_processors.auth',
# #                 'django.contrib.messages.context_processors.messages',
# #             ],
# #         },
# #     },
# # ]

# # WSGI_APPLICATION = 'letsemaMfis.wsgi.application'

# # # DATABASE
# # DATABASES = {
# #     'default': {
# #         'ENGINE':   'django.db.backends.postgresql',
# #         'NAME':     config('DB_NAME',     default='letsema_mfi'),
# #         'USER':     config('DB_USER',     default='postgres'),
# #         'PASSWORD': config('DB_PASSWORD', default='admin'),
# #         'HOST':     config('DB_HOST',     default='192.168.239.7'),
# #         'PORT':     config('DB_PORT',     default='5432'),
# #     }
# # }

# # # PASSWORD VALIDATION
# # AUTH_PASSWORD_VALIDATORS = [
# #     {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
# #     {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
# #     {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
# #     {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
# # ]

# # # INTERNATIONALIZATION
# # LANGUAGE_CODE = 'en-us'
# # TIME_ZONE     = 'Africa/Maseru'
# # USE_I18N      = True
# # USE_TZ        = True

# # STATIC_URL = 'static/'
# # DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# # # AUTH
# # AUTH_USER_MODEL = 'users.User'

# # # REST FRAMEWORK
# # REST_FRAMEWORK = {
# #     'DEFAULT_AUTHENTICATION_CLASSES': (
# #         'rest_framework_simplejwt.authentication.JWTAuthentication',
# #     ),
# #     'DEFAULT_PERMISSION_CLASSES': (
# #         'rest_framework.permissions.IsAuthenticated',
# #     ),
# #     'DEFAULT_FILTER_BACKENDS': (
# #         'django_filters.rest_framework.DjangoFilterBackend',
# #         'rest_framework.filters.SearchFilter',
# #         'rest_framework.filters.OrderingFilter',
# #     ),
# # }

# # # SIMPLE JWT
# # SIMPLE_JWT = {
# #     'ACCESS_TOKEN_LIFETIME':  timedelta(minutes=15),
# #     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
# #     'ROTATE_REFRESH_TOKENS':  False,
# #     'BLACKLIST_AFTER_ROTATION': True,
# #     'AUTH_HEADER_TYPES':      ('Bearer',),
# #     'AUTH_HEADER_NAME':       'HTTP_AUTHORIZATION',
# # }

# # # CORS
# # CORS_ALLOW_ALL_ORIGINS  = True
# # CORS_ALLOW_CREDENTIALS  = True
# from pathlib import Path
# from decouple import config
# from datetime import timedelta

# # BASE_DIR setup
# BASE_DIR = Path(__file__).resolve().parent.parent

# # SECURITY
# SECRET_KEY = config(
#     'SECRET_KEY',
#     default='django-insecure-j24*un!#5lhbxt8_6m3w!1w_@nz#j71c6e1+xa6*l(u0wd!y25'
# )
# DEBUG = config('DEBUG', default=True, cast=bool)
# ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*').split(',')

# # APPS
# INSTALLED_APPS = [
#     'users',
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',

#     # REST framework & auth
#     'rest_framework',
#     'rest_framework_simplejwt',
#     'rest_framework_simplejwt.token_blacklist',
#     'django_filters',
#     'corsheaders',

#     # Project apps
#     'core',
#     'mfis',
#     'loans',
# ]

# # MIDDLEWARE
# MIDDLEWARE = [
#     'django.middleware.security.SecurityMiddleware',
#     'corsheaders.middleware.CorsMiddleware',

#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',

#     'core.middleware.TenantMiddleware',
# ]

# ROOT_URLCONF = 'letsemaMfis.urls'
# LETSEMA_TENANT_DOMAIN = config('LETSEMA_TENANT_DOMAIN', default='kkfinance.local')

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = 'letsemaMfis.wsgi.application'

# # DATABASE
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': config('DB_NAME', default='letsema_mfi'),
#         'USER': config('DB_USER', default='postgres'),
#         'PASSWORD': config('DB_PASSWORD', default='admin'),
#         'HOST': config('DB_HOST', default='197.220.137.227'),
#         'PORT': config('DB_PORT', default='5432'),
#     }
# }

# # PASSWORD VALIDATION
# AUTH_PASSWORD_VALIDATORS = [
#     {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
#     {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
#     {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
#     {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
# ]

# # INTERNATIONALIZATION
# LANGUAGE_CODE = 'en-us'
# TIME_ZONE = 'Africa/Maseru'
# USE_I18N = True
# USE_TZ = True

# # STATIC
# STATIC_URL = 'static/'
# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# # CUSTOM USER MODEL
# AUTH_USER_MODEL = 'users.User'

# # DRF CONFIGURATION
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ),
#     # no global permission class → default is AllowAny
#     'DEFAULT_PERMISSION_CLASSES': (),
#     'DEFAULT_FILTER_BACKENDS': (
#         'django_filters.rest_framework.DjangoFilterBackend',
#         'rest_framework.filters.SearchFilter',
#         'rest_framework.filters.OrderingFilter',
#     ),
# }

# # SIMPLE JWT SETTINGS
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'ROTATE_REFRESH_TOKENS': False,
#     'BLACKLIST_AFTER_ROTATION': True,
#     'AUTH_HEADER_TYPES': ('Bearer',),
#     'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
# }

# # CORS
# CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOW_CREDENTIALS = True



from pathlib import Path
from decouple import config
from datetime import timedelta
from mongoengine import connect

# BASE_DIR setup
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY
SECRET_KEY = config(
    'SECRET_KEY',
    default='django-insecure-j24*un!#5lhbxt8_6m3w!1w_@nz#j71c6e1+xa6*l(u0wd!y25'
)
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*').split(',')

# INSTALLED APPS
INSTALLED_APPS = [
    # Core Django apps
    'users',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # REST & Auth
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'django_filters',
    'corsheaders',
    'django_mongoengine',

    # Project apps
    'core',
    'mfis',
    'loans',
    'repayments',
]

# MIDDLEWARE
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'core.middleware.TenantMiddleware',
]

ROOT_URLCONF = 'letsemaMfis.urls'
LETSEMA_TENANT_DOMAIN = config('LETSEMA_TENANT_DOMAIN', default='kkfinance.local')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'letsemaMfis.wsgi.application'

# -------------------------------------------------------------------
# DATABASES (PostgreSQL) - master + replica
# -------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='letsema_mfi'),
        'USER': config('DB_USER_MASTER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD_MASTER', default='admin'),
        'HOST': config('DB_HOST_MASTER', default='192.168.72.7'),
        'PORT': config('DB_PORT', default='5432'),
        'CONN_MAX_AGE': 600,
    },
    'replica': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='letsema_mfi'),
        'USER': config('DB_USER_REPLICA', default='replicator'),
        'PASSWORD': config('DB_PASSWORD_REPLICA', default='replicatorpass'),
        'HOST': config('DB_HOST_REPLICA', default='197.220.137.200'),
        'PORT': config('DB_PORT', default='5432'),
        'CONN_MAX_AGE': 600,
    },
}

# AUTH PASSWORD VALIDATORS
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# INTERNATIONALIZATION
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Maseru'
USE_I18N = True
USE_TZ = True

# STATIC FILES
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CUSTOM USER MODEL
AUTH_USER_MODEL = 'users.User'

# REST FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
}

# SIMPLE JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
}

# CORS
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# -------------------------------------------------------------------
# MongoEngine replica-set configuration
# -------------------------------------------------------------------
MONGODB_DATABASES = {
    'default': {
        'name': 'letsema',
        'host': 'mongodb://localhost:27017/letsema',
        'tz_aware': True,
    }
}

connect(
    db='letsema',
    host='mongodb://localhost:27017/letsema',
)
