import datetime
from django.shortcuts import render
from django.http import HttpResponse
from basicauth.decorators import basic_auth_required
from django.db.models import Q
from .models import *

@basic_auth_required
def index(request):
   return render(request, 'camp/index.html')

def search(request):
   print(request.POST)
   if request.POST:  # TOP、検索画面より検索時
      # リクエストパラメーター
      search_param = {
         "place": request.POST.get('place'),
         "date": request.POST.get('date'),
         "date_start": request.POST.get('date_start'),
         "date_end": request.POST.get('date_end'),
         "member_adult": request.POST.get('member_adult'),
         "member_child": request.POST.get('member_child'),
      }
      # DB検索用変数
      places = search_param["place"].split('、')
      place = {
         "country": places[0],
         "prefectures": places[1],
         "city": places[2] if len(places) > 2 else ""
      }
      date_start_str = search_param["date_start"].replace('00:00:00 GMT+0900 (日本標準時)', '')
      date_start_convert = datetime.datetime.strptime(date_start_str, '%a %b %d %Y ')
      date_start = datetime.date(date_start_convert.year, date_start_convert.month, date_start_convert.day)
      date_end_str = search_param["date_end"].replace('00:00:00 GMT+0900 (日本標準時)', '')
      date_end_convert = datetime.datetime.strptime(date_end_str, '%a %b %d %Y ')
      date_end = datetime.date(date_end_convert.year, date_end_convert.month, date_end_convert.day)
      date = {
         "start": date_start,
         "end": date_end
      }
      # テンプレート処理データ
      host_ids = Host_Place.objects.filter(country=place["country"], prefectures=place["prefectures"]).filter(city__icontains=place["city"]).values_list("host_id", flat=True)
      hosts = Host.objects.filter(pk__in=host_ids)
      for host in hosts:
         host.cipher = crypto_text_to_hex(str(host.id), "mincamp")   # ホストIDを暗号化
         host.host_images = Host_Image.objects.filter(host_id__exact=host.id).all()
         host.host_place = Host_Place.objects.get(host_id=host.id)
         host.host_price = Host_Price.objects.filter(host_id__exact=host.id).filter(Q(start_date__lte=date["start"], end_date__gte=date["start"]) | Q(start_date__lte=date["start"], end_date__isnull=True))[0]
         host.host_tags = Tag.objects.filter(pk__in=Host_Tag.objects.filter(host_id__exact=host.id).values_list('tag_id', flat=True))

   else:
      search_param = { "place": "", "date": "", "member_adult": "", "member_child": "" }
      hosts = Host.objects.all()
      host_images = Host_Image.objects.all()
      host_places = Host_Place.objects.all()
      host_prices = Host_Price.objects.all()
      host_tags = Host_Tag.objects.all()
      

   context = {
      "search_param": search_param,
      "hosts": hosts
   }
   return render(request, 'camp/search.html', context)

def detail(request, id):
   host_id = decrypto_hex_to_text(id, "mincamp")                  # ホストIDを複合
   return render(request, 'camp/detail.html')

def reservation_apply(request):
   return render(request, 'camp/reservation_apply.html')

def reservation_complite(request):
   return render(request, 'camp/reservation_complite.html')

# 暗号化：引数の２つの文字列をXORした結果をhex文字列で返す
# src_text=暗号化したい文字列
# key=暗号化するためのキー文字列
def crypto_text_to_hex(src_text, key):
   if src_text and key:
      xor_code = key
      # keyが短い場合は、繰り返して必要バイト数を準備する
      while len(src_text) > len(xor_code):
         xor_code += key
      return "".join([chr(ord(data) ^ ord(code))
                     for (data, code) in zip(src_text, xor_code)]).encode().hex()
# 複号：引数のHex文字列とkeyをXORして戻した文字列で返す
# hex_text=暗号化されているhex文字列
# key=複号するためのキー文字列
def decrypto_hex_to_text(hex_text, key):
   if hex_text and key:
      try:
         crypt_data = bytes.fromhex(hex_text).decode()
      except ValueError:
         crypt_data = None

      if crypt_data:
         xor_code = key
         # keyが短い場合は、繰り返して必要バイト数を準備する
         while len(crypt_data) > len(xor_code):
               xor_code += key
         return "".join([chr(ord(data) ^ ord(code))
                           for (data, code) in zip(crypt_data, xor_code)])