from django.shortcuts import render
from django.http import HttpResponse

from .models import Case, Analysis

# Home
def index(request):
    return render(request, 'index.html', {})

# All current cases
def current_cases(request):
	cases = Case.objects.all()
	return render(request, 'current_cases.html', {'cases': cases})