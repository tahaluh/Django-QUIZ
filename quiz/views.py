from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz, Question, Option
from .serializers import QuizSerializer, QuestionSerializer, OptionSerializer


class QuizAPIView(APIView):
    def get(self, request):
        quiz = Quiz.objects.all()
        serializer = QuizSerializer(quiz, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionAPIView(APIView):
    def get(self, request):
        question = Question.objects.all()
        serializer = QuestionSerializer(question, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OptionAPIView(APIView):
    def get(self, request):
        option = Option.objects.all()
        serializer = OptionSerializer(option, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
