from django.urls import path
from . import views

app_name = "camp"

urlpatterns = [
   path('', views.index, name='index'),
   path('camp/search', views.search, name='search'),
   path('camp/detail', views.detail, name='detail'),
]
