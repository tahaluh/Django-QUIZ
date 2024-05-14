from django.contrib import admin
from .models import Quiz, Question, Option


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'title', 'description', 'is_published',  'creator_uuid', 'created_at', 'updated_at', 'deleted_at')  # noqa E501


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'question', 'quiz_uuid',
                    'created_at', 'updated_at')


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'option', 'question_uuid',
                    'correct_option', 'created_at', 'updated_at')
