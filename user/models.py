from django.db import models
from globals.models import BaseModel
from enum import Enum


class UserRoles(Enum):
    ADMIN = 'admin'
    COMMON_USER = 'common_user'


class User(BaseModel):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)

    is_active = models.BooleanField(default=False)

    role = models.CharField(max_length=20, choices=[
                            (tag.value, tag.name) for tag in UserRoles], default=UserRoles.COMMON_USER.value)  # noqa E501

    deleted_at = models.DateTimeField(null=True, blank=True)
