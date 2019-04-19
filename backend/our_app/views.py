from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect

from django.utils import timezone

from .models import Case, Analysis
from .forms import CaseForm

# Home
def index(request):
    return render(request, 'index.html', {})

# All current cases
def current_cases(request):
	cases = Case.objects.filter(status='current')
	return render(request, 'cases.html', {'cases': cases})

# All past cases
def past_cases(request):
	cases = Case.objects.filter(status='past')
	return render(request, 'cases.html', {'cases': cases})

# Create new case
def new_case(request):
	if request.method == "POST":
		form = CaseForm(request.POST, request.FILES)
		print(form)
		print(form.errors)
		print(request.FILES)

		if form.is_valid():
			case = form.save(commit=False)
			case.status = 'current'
			case.published_date = timezone.now()
			case.save()
			return redirect('current_cases')
	else:	
		form = CaseForm()
	
	return render(request, 'new_case.html', {'form': form})