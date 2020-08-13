from django.shortcuts import render
from django.http import HttpResponse
from basicauth.decorators import basic_auth_required
from .models import *

@basic_auth_required
def index(request):
   print("aaaa")
   return render(request, 'camp/index.html')

def search(request):
   print(request.POST)
   if request.POST:  # TOP、検索画面より検索時
      search_param = {
         "place": request.POST.get('place'),
         "date": request.POST.get('date'),
         "member_adult": request.POST.get('member_adult'),
         "member_child": request.POST.get('member_child'),
      }
      hosts = Host.objects.all()
      host_images = Host_Image.objects.all()
      host_places = Host_Place.objects.all()
      host_prices = Host_Price.objects.all()
      host_tags = Host_Tag.objects.all()
   else:
      search_param = { "place": "", "date": "", "member_adult": "", "member_child": "" }
      hosts = Host.objects.all()
      host_images = Host_Image.objects.all()
      host_places = Host_Place.objects.all()
      host_prices = Host_Price.objects.all()
      host_tags = Host_Tag.objects.all()
      
   for host in hosts:
      host.cipher = crypto_text_to_hex(str(host.id), "mincamp")   # ホストIDを暗号化
      host.host_images = Host_Image.objects.filter(host_id__exact=host.id).all()
      host.host_places = Host_Place.objects.get(host_id=host.id)
      host.host_prices = "7000"
      host.host_tags = Tag.objects.filter(pk__in=Host_Tag.objects.filter(host_id__exact=host.id).values_list('tag_id', flat=True))

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