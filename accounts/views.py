from django.shortcuts import render
from django.http import HttpResponse
from basicauth.decorators import basic_auth_required

@basic_auth_required
def signup(request):
   return render(request, 'accounts/sign_up.html')

def signin(request):
   return render(request, 'accounts/sign_in.html')