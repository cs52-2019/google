from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('currentcases/', views.current_cases, name='current_cases'),
]