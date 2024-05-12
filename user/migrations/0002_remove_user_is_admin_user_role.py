# Generated by Django 5.0.4 on 2024-05-12 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_admin',
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'ADMIN'), ('common_user', 'COMMON_USER')], default='common_user', max_length=20),
        ),
    ]