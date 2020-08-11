# Generated by Django 2.0 on 2020-08-11 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0004_auto_20200811_2155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='host',
            name='description',
            field=models.CharField(max_length=200, verbose_name='説明'),
        ),
        migrations.AlterField(
            model_name='host',
            name='street_view',
            field=models.CharField(max_length=200, verbose_name='ストリートビューURL'),
        ),
        migrations.AlterField(
            model_name='host',
            name='title',
            field=models.CharField(max_length=200, verbose_name='タイトル'),
        ),
    ]