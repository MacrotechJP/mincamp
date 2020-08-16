from django.contrib import admin

from camp.models import *
admin.site.register(Tag)

admin.site.register(Host)
admin.site.register(Host_Image)
admin.site.register(Host_Price)
admin.site.register(Host_Tag)

admin.site.register(Reservation)
admin.site.register(Reservation_Cost)
admin.site.register(Reservation_Review)