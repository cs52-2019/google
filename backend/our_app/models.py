from django.db import models

class Case(models.Model):
	status = models.CharField(
		choices = (('current', 'current'), ('past', 'past')),
		max_length = 7
	)
	title = models.CharField(max_length = 200)
	image = models.ImageField(upload_to = 'cases')

class Analysis(models.Model):
	title = models.CharField(max_length = 200)
	case = models.ForeignKey(Case, on_delete = models.CASCADE)
	# locations = 
	time_start = models.DateTimeField()
	time_end = models.DateTimeField()
	frequency = models.DurationField()