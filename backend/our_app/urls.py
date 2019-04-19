from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('currentcases/', views.current_cases, name='current_cases'),
    path('newcase/', views.new_case, name='new_case'),
    path('pastcases/', views.past_cases, name='past_cases'),
]