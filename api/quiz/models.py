from django.db import models
from user.models import User
from globals.models import BaseModel


class Quiz(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_published = models.BooleanField(default=False)

    creator = models.ForeignKey(
        User, related_name="quizzes",  on_delete=models.CASCADE, to_field='uuid')  # noqa E501

    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Quizzes'


class Question(BaseModel):
    question = models.CharField(max_length=255)

    quiz = models.ForeignKey(
        Quiz, related_name='questions', on_delete=models.CASCADE, to_field='uuid')  # noqa E501


class Option(BaseModel):
    option = models.CharField(max_length=255)

    question = models.ForeignKey(
        Question, related_name='options', on_delete=models.CASCADE, to_field='uuid')  # noqa E501

    correct_option = models.BooleanField(default=False)
