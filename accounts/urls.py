from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # path('', views.Top.as_view(), name='top'),
    path('', views.Login.as_view(), name='sign_in'),
    path('sign_in/', views.Login.as_view(), name='sign_in'),
    path('sign_out/', views.Logout.as_view(), name='sign_out'),
    path('sign_up/', views.UserCreate.as_view(), name='sign_up'),
    path('sign_up/done', views.UserCreateDone.as_view(), name='sign_up_done'),
    path('sign_up/complete/<token>/', views.UserCreateComplete.as_view(), name='sign_up_complete'),
]