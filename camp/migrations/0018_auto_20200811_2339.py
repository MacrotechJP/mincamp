# Generated by Django 2.0 on 2020-08-11 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0017_auto_20200811_2335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='host_place',
            name='address1',
            field=models.CharField(max_length=200, null=True, verbose_name='丁、番地、号'),
        ),
    ]