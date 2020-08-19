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
    # Host.objects.get_or_create(
    #     owner=User.objects.get(pk=49),
    #     title="エアストリームやカフェもあるオシャレ空間で自然を堪能しましょう！",
    #     description="エアストリームでカフェを営業しております！美味しいハンバーガーはいかがでしょうか？お庭でのキャンプで檜原村の自然を感じてください。",
    #     country="日本",
    #     prefectures="東京都",
    #     city="西多摩郡檜原村南郷",
    #     address1="６２１０",
    #     max_acceptable_users=10
    # )
    Host.objects.get_or_create(
        owner=User.objects.get(pk=49),
        title="山と川に囲まれたテラスでわいわいBBQ、エアストリームでゆっくりくつろぐおしゃれ空間",
        description="エアストリームでカフェを営業しております！美味しいハンバーガーはいかがでしょうか？お庭でのキャンプで檜原村の自然を感じてください。",
        country="日本",
        prefectures="東京都",
        city="西多摩郡檜原村南郷",
        address1="６２１０",
        max_acceptable_users=4
    )

if __name__ == "__main__":
    print('Mock Data Insert scripts')
    insert()
    print('Mock Data Insert complate')