# Generated by Django 2.0 on 2020-08-16 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_auto_20200816_2345'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_profile',
            name='from_country',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='出身地'),
        ),
    ]
