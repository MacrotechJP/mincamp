from django.urls import path
from . import views

app_name = "mypage"

urlpatterns = [
    # マイページトップ
    path('', views.index, name='index'),
    # # お知らせページ
    # path('info/overall', views.info_overall, name='info_overall'),             #[全体のお知らせ]
    # path('info/individual', views.info_individual, name='info_individual'),    #[あなたへのお知らせ]
    # path('info/significant', views.info_significant, name='info_significant'), #[重要なお知らせ]
    # # カレンダーページ
    # path('calendar', views.calendar, name='calendar'),
    # # 予約情報
    # path('reservation', views.reservation, name='reservation'),                  #[予約一覧]
    # # マイリスト
    # path('mylist/favorite', views.favorite, name='favorite'),                  #[お気に入り]
    # ホスト情報
    path('host/list', views.host_list, name='host_list'),                      #[登録ホスト一覧]
    # path('host/profit', views.host_profit, name='host_profit'),                #[収益情報]
    # # ユーザー情報
    # # path('user/login-way', views.user_loginWay, name='user_login-way'),       #[ログイン方法]
    # path('user/profit', views.host_profit, name='host_profit'),                #[プロフィール、住所、性別等]
    # path('user/profit', views.host_profit, name='host_profit'),                #[政府発行の身分証明書]
    # path('user/profit', views.host_profit, name='host_profit'),                #[お支払い方法]
    # path('user/profit', views.host_profit, name='host_profit'),                #[お支払い履歴]
    # path('user/profit', views.host_profit, name='host_profit'),                #[保有ポイント、クーポン等]
    # path('user/profit', views.host_profit, name='host_profit'),                #[キャンパーランク]
    # # 設定
    # path('user/profit', views.host_profit, name='host_profit'),                #[通知]
    # # サポート
    # path('user/profit', views.host_profit, name='host_profit'),                #[カスタマーサポート]
    # path('user/profit', views.host_profit, name='host_profit'),                #[よくあるご質問]
    # path('user/profit', views.host_profit, name='host_profit'),                #[予約の管理]
    # path('user/profit', views.host_profit, name='host_profit'),                #[ご意見]
    # # 法律と方針
    # path('user/profit', views.host_profit, name='host_profit'),                #[利用規約]
    # path('user/profit', views.host_profit, name='host_profit'),                #[プライバシーポリシー]
    # path('user/profit', views.host_profit, name='host_profit'),                #[著作権]
]