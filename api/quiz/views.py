from rest_framework import generics, viewsets, mixins, decorators, response, status
from .models import Quiz, Question, Option
from .serializers import QuizSerializer, QuestionSerializer, OptionSerializer


class QuizzesAPIView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuestionsAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        if self.kwargs.get('quiz_pk'):
            return self.queryset.filter(quiz_uuid=self.kwargs.get('quiz_pk'))
        return self.queryset.all()


class QuestionAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class OptionsAPIView(generics.ListCreateAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

    def get_queryset(self):
        if self.kwargs.get('question_pk'):
            return self.queryset.filter(question_uuid=self.kwargs.get('question_pk'))
        return self.queryset.all()


class OptionAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer


# v2

'''
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @decorators.action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        quiz = self.get_object()
        serializer = QuestionSerializer(quiz.questions.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
'''

# Customizing the QuizViewSet to use mixins


class QuizViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):  # noqa E501
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_queryset(self):
        return self.queryset.filter(is_published=True)

    @decorators.action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        quiz = self.get_object()
        serializer = QuestionSerializer(quiz.questions.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @decorators.action(detail=True, methods=['get'])
    def options(self, request, pk=None):
        question = self.get_object()
        serializer = OptionSerializer(question.options.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
