from django import forms
from .models import Case, Analysis

class CaseForm(forms.ModelForm):
	class Meta:
		model = Case
		fields = ['title', 'image']