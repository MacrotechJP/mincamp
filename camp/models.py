from django.db import models
from accounts.models import User

class Tag(models.Model):
    class Meta:
        verbose_name_plural = 'タグマスター'
    name = models.CharField(max_length=200,              verbose_name='名前')
    color =  models.CharField(max_length=200,            verbose_name='色')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,     verbose_name='更新日時')

class Host(models.Model):
    class Meta:
        verbose_name_plural = 'ホスト'
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='オーナー')
    title = models.CharField(max_length=200,                  verbose_name='タイトル')
    description = models.CharField(max_length=200,            verbose_name='概要')
    street_view = models.CharField(max_length=200,            verbose_name='ストリートビューURL')
    created_at = models.DateTimeField(auto_now_add=True,      verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,          verbose_name='更新日時')

class Host_Image(models.Model):
    class Meta:
        verbose_name_plural = 'ホスト画像'
    host = models.ForeignKey(Host, on_delete=models.CASCADE, verbose_name='ホスト外部キー')
    title = models.CharField(max_length=200,                 verbose_name='タイトル')
    url = models.CharField(max_length=200,                   verbose_name='URL')
    created_at = models.DateTimeField(auto_now_add=True,     verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,         verbose_name='更新日時')

class Host_Place(models.Model):
    class Meta:
        verbose_name_plural = 'ホスト場所'
    host = models.ForeignKey(Host, on_delete=models.CASCADE,           verbose_name='ホスト外部キー')
    country = models.CharField(max_length=200,                         verbose_name='国')
    prefectures = models.CharField(max_length=200,                     verbose_name='都道府県')
    city = models.CharField(max_length=200,                            verbose_name='市区町村')
    address1 = models.CharField(max_length=200, null=True, blank=True, verbose_name='丁、番地、号')
    address2 = models.CharField(max_length=200, null=True, blank=True, verbose_name='マンション、アパート等')
    created_at = models.DateTimeField(auto_now_add=True,               verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,                   verbose_name='更新日時')

class Host_Price(models.Model):
    class Meta:
        verbose_name_plural = 'ホスト料金'
    host = models.ForeignKey(Host, on_delete=models.CASCADE,     verbose_name='ホスト外部キー')
    start_date = models.DateField(                               verbose_name='開始日時')
    end_date = models.DateField(                                 verbose_name='終了日時')
    value = models.IntegerField(                                 verbose_name='価格')
    discount_value = models.IntegerField(null=True, blank=True , verbose_name='割引価格')
    created_at = models.DateTimeField(auto_now_add=True,         verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,             verbose_name='更新日時')

class Host_Tag(models.Model):
    class Meta:
        verbose_name_plural = 'ホストタグ'
    host = models.ForeignKey(Host, on_delete=models.CASCADE, verbose_name='ホスト外部キー')
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE,   verbose_name='タグ外部キー')

class Reservation(models.Model):
    class Meta:
        verbose_name_plural = '予約'
    host = models.ForeignKey(Host, on_delete=models.CASCADE,  verbose_name='ホスト外部キー')
    guest = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='ゲスト外部キー')
    start_date = models.DateField(                            verbose_name='開始日時')
    end_date = models.DateField(                              verbose_name='終了日時')
    created_at = models.DateTimeField(auto_now_add=True,      verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,          verbose_name='更新日時')

class Reservation_Cost(models.Model):
    class Meta:
        verbose_name_plural = '予約費用'
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, verbose_name='予約外部キー')
    type = models.IntegerField(                                            verbose_name='タイプ')
    value = models.IntegerField(                                           verbose_name='価格')
    created_at = models.DateTimeField(auto_now_add=True,                   verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,                       verbose_name='更新日時')

class Reservation_Review(models.Model):
    class Meta:
        verbose_name_plural = '予約レビュー'
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, verbose_name='予約外部キー')
    title = models.CharField(max_length=200,                               verbose_name='タイトル')
    detail = models.CharField(max_length=200,                              verbose_name='内容')
    is_anonymous = models.BooleanField(default=False,                      verbose_name='匿名フラグ')   #(0:実名、1:匿名)
    rank = models.IntegerField(                                            verbose_name='レビューランク')
    created_at = models.DateTimeField(auto_now_add=True,                   verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True,                       verbose_name='更新日時')
