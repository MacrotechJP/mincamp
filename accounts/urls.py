from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'accounts'

urlpatterns = [
    # 新規登録
    path('sign_up/', views.UserCreate.as_view(), name='sign_up'),
    path('sign_up/done', views.UserCreateDone.as_view(), name='sign_up_done'),
    path('sign_up/complete/<token>/', views.UserCreateComplete.as_view(), name='sign_up_complete'),
    # ログイン
    path('sign_in/', views.Login.as_view(), name='sign_in'),
    # ログアウト
    path('sign_out/', views.Logout.as_view(), name='sign_out'),
    # パスワード再設定
    path('password_reset/', views.PasswordReset.as_view(), name='password_reset'),
    path('password_reset/done/', views.PasswordResetDone.as_view(), name='password_reset_done'),
    path('password_reset/confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password_reset_confirm'),
    path('password_reset/complete/', views.PasswordResetComplete.as_view(), name='password_reset_complete'),
]