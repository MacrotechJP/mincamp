# Generated by Django 2.0 on 2020-08-11 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0016_auto_20200811_2333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='host_place',
            name='address2',
            field=models.CharField(max_length=200, null=True, verbose_name='マンション、アパート等'),
        ),
    ]