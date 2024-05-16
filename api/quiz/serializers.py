from rest_framework import serializers
from .models import Quiz, Question, Option


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'
        extra_kwargs = {
            'author': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
            'deleted_at': {'read_only': True}

        }


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs = {
            'quiz': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'
        extra_kwargs = {
            'question': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
