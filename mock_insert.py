# population_first_app.py
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mincamp.settings')

import django
django.setup()

import random
from camp.models import *
from accounts.models import User

def insert():
    # Tag.objects.get_or_create(name="テスト", color="red")
    Host.objects.get_or_create(
        owner=User.objects.get(pk=49),
        title="これはテストタイトルです",
        description="これはテスト概要です",
        country="日本",
        prefectures="大阪府",
        city="大阪市住吉区杉本",
        address1="１丁目２−４"
    )

if __name__ == "__main__":
    print('Mock Data Insert scripts')
    insert()
    print('Mock Data Insert complate')