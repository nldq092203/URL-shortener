from django.db import models
from datetime import timedelta
from django.utils.timezone import now

def get_expiration_date():
    return now() + timedelta(days=90)

# Create your models here.
class UrlMapping(models.Model):
    short_url_id = models.CharField(db_index=True, max_length=128, primary_key=True)
    long_url = models.URLField()
    creation_date = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField(default=get_expiration_date, db_index=True)

