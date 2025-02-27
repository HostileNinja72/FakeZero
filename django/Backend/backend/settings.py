import os
from pathlib import Path

# ✅ Define BASE_DIR before using it
BASE_DIR = Path(__file__).resolve().parent.parent



INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',  # ✅ Add this back
    'django.contrib.contenttypes',  # ✅ Required for auth models
    'django.contrib.sessions',  # ✅ Required for session-based auth
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'pages',
]


# ✅ Allow all hosts (For Development Only, Restrict in Production)
ALLOWED_HOSTS = ["*"]

# ✅ URL Configuration
ROOT_URLCONF = "backend.urls"

# ✅ CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True  # ✅ Allow all origins (for development only)
# If you need specific origins in production, use:
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]

# ✅ Allowed HTTP Methods
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
]

# ✅ Allowed Headers
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # ✅ Add this back
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',  # ✅ Add this back if using CSRF protection
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # ✅ Required for auth
    'django.contrib.messages.middleware.MessageMiddleware',
]

# ✅ Disable Database Configuration
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.dummy"
    }
}



# ✅ Ensure Django Doesn't Try to Create a Database Table for Sessions/Auth (Since No DB)

# ✅ Disable Authentication Middleware (Since No DB)
MIDDLEWARE = [middleware for middleware in MIDDLEWARE if middleware not in [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.authentication.AuthenticationMiddleware"
]]

# ✅ Static Files Settings (Still Needed for Static Content)
STATIC_URL = "/static/"
STATIC_ROOT = "staticfiles"

