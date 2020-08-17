# Generated by Django 2.0 on 2020-08-16 14:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_nickname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, default=django.utils.timezone.now, max_length=200, verbose_name='nick name'),
            preserve_default=False,
        ),
    ]