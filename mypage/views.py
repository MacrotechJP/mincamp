from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'mypage/index.html')

# # お知らせ
# def info_overall(request):
#     return render(request, 'mypage/info/overall.html')

# def info_individual(request):
#     return render(request, 'mypage/info/individual.html')

# def info_significant(request):
#     return render(request, 'mypage/info/significant.html')

# # カレンダー
# def calendar(request):
#     return render(request, 'mypage/calendar/index.html')

# # 予約情報
# def reservation(request):
#     return render(request, 'mypage/reservation/index.html')

# # マイリスト
# def favorite(request):
#     return render(request, 'mypage/favorite/index.html')

# # ホスト情報
# def host_list(request):
#     return render(request, 'mypage/host/list.html')

# def host_profit(request):
#     return render(request, 'mypage/host/profit.html')