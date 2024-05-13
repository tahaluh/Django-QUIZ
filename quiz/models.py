from django.db import models
from user.models import User
from globals.models import BaseModel


class Quiz(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_published = models.BooleanField(default=False)

    creator_uuid = models.ForeignKey(
        User, related_name="creator",  on_delete=models.CASCADE, to_field='uuid')  # noqa E501

    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Quizzes'


class Question(BaseModel):
    question = models.CharField(max_length=255)

    quiz_uuid = models.ForeignKey(
        Quiz, related_name='questions', on_delete=models.CASCADE, to_field='uuid')  # noqa E501


class Option(BaseModel):
    option = models.CharField(max_length=255)

    question_uuid = models.ForeignKey(
        Question, related_name='options', on_delete=models.CASCADE, to_field='uuid')  # noqa E501

    correct_option = models.BooleanField(default=False)
