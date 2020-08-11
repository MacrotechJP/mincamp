# Generated by Django 2.0 on 2020-08-11 14:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0013_auto_20200811_2317'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation_Cost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.IntegerField(verbose_name='タイプ')),
                ('value', models.IntegerField(verbose_name='価格')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='camp.Reservation', verbose_name='予約外部キー')),
            ],
            options={
                'verbose_name_plural': '予約費用',
            },
        ),
    ]