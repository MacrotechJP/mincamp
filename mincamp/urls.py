from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('camp.urls')),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('social_django.urls', namespace='social')),   # ソーシャルログイン関連
    path('admin/', admin.site.urls),
    path('mypage/', include('mypage.urls')),
]
