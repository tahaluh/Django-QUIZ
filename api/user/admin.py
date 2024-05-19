from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'email', 'is_staff',
                    'created_at', 'updated_at', 'deleted_at')
