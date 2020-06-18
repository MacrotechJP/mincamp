from django.shortcuts import render
from django.http import HttpResponse
from basicauth.decorators import basic_auth_required

@basic_auth_required
def index(request):
   return render(request, 'camp/index.html')

def search(request):
   return render(request, 'camp/search.html')