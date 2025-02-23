from django.urls import path
from . import views

urlpatterns = [
    path("predict/", views.predict, name="predict"),
]

# python manage.py /runserver to run server