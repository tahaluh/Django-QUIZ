from django.db import models
from user.models import User
from globals.models import BaseModel


class Quiz(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_published = models.BooleanField(default=False)

    creator_uuid = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field='uuid')

    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Quizzes'


class Question(BaseModel):
    question = models.CharField(max_length=255)

    quiz_uuid = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, to_field='uuid')


class Option(BaseModel):
    option = models.CharField(max_length=255)

    question_uuid = models.ForeignKey(
        Question, on_delete=models.CASCADE, to_field='uuid')

    correct_option = models.BooleanField(default=False)
