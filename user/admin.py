from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'first_name', 'last_name', 'email',
                    'role', 'is_active', 'created_at', 'updated_at', 'deleted_at')  # noqa E501
