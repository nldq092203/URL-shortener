from django.urls import path
from .views import UrlGeneration, UrlRedirection
urlpatterns = [
    path('urls/', UrlGeneration.as_view(), name="url_generation"),
    path('urls/<str:short_url_id>/', UrlRedirection.as_view(), name="url_redirection")
]