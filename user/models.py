from django.db import models
from django.contrib.auth.models import AbstractUser
from globals.models import BaseModel


class User(AbstractUser, BaseModel):
    deleted_at = models.DateTimeField(null=True, blank=True)
