from django.urls import path
from pages.views import analyze_text

urlpatterns = [
    path("analyze/", analyze_text, name="analyze_text"),
]
