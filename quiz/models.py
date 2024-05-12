from django.db import models
from user.models import User


class Quiz(models.Model):
    uuid = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_published = models.BooleanField(default=False)

    creator_uuid = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field='uuid')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)


class Question(models.Model):
    uuid = models.UUIDField(primary_key=True)
    question = models.CharField(max_length=255)

    quiz_uuid = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, to_field='uuid')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Option(models.Model):
    uuid = models.UUIDField(primary_key=True)
    option = models.CharField(max_length=255)

    question_uuid = models.ForeignKey(
        Question, on_delete=models.CASCADE, to_field='uuid')

    correct_option = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
