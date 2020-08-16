# Generated by Django 2.0 on 2020-08-16 12:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0022_auto_20200814_1029'),
    ]

    operations = [
        migrations.AddField(
            model_name='host',
            name='address1',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='丁、番地、号'),
        ),
        migrations.AddField(
            model_name='host',
            name='address2',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='マンション、アパート等'),
        ),
        migrations.AddField(
            model_name='host',
            name='city',
            field=models.CharField(default=django.utils.timezone.now, max_length=200, verbose_name='市区町村'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='host',
            name='country',
            field=models.CharField(default=django.utils.timezone.now, max_length=200, verbose_name='国'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='host',
            name='prefectures',
            field=models.CharField(default=django.utils.timezone.now, max_length=200, verbose_name='都道府県'),
            preserve_default=False,
        ),
    ]
