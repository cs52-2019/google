from django.contrib import admin

from .models import Case, Analysis

# Register models for displaying and editing on admin dashboard
admin.site.register(Case)
admin.site.register(Analysis)
