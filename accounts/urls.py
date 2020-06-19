# from django.urls import path
# from . import views

# app_name = 'accounts'

# urlpatterns = [
#     path('signup/', views.signup, name='signup'),
#     path('signin/', views.signin, name='signin'),
# ]

from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # path('', views.Top.as_view(), name='top'),
    path('sign_in/', views.Login.as_view(), name='sign_in'),
    path('sign_out/', views.Logout.as_view(), name='sign_out'),
]