from django.contrib import admin
from .models import UrlMapping

@admin.register(UrlMapping)
class UrlMappingAdmin(admin.ModelAdmin):
    list_display = ('short_url_id', 'long_url', 'creation_date', 'expiration_date')
    list_filter = ('creation_date', 'expiration_date')
    search_fields = ('short_url_id', 'long_url')
    ordering = ('-creation_date',)