from rest_framework import viewsets, mixins, decorators, response, status
from .models import Quiz, Question, Option
from .serializers import QuizSerializer, QuestionSerializer, OptionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class QuizViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):  # noqa E501
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.action == 'list' and self.request.user.is_authenticated:
            return self.queryset.filter(creator=self.request.user)
        else:
            return self.queryset.filter(is_published=True)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)  # noqa E501
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # noqa E501

    def delete(self, request, *args, **kwargs):
        quiz = self.get_object()
        if quiz.creator == request.user:
            quiz.delete()
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        return response.Response(status=status.HTTP_403_FORBIDDEN)

    @decorators.action(detail=False, methods=['get'])
    def mine(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)

    @decorators.action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        quiz = self.get_object()
        serializer = QuestionSerializer(quiz.questions.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    @decorators.action(detail=True, methods=['get'])
    def options(self, request, pk=None):
        question = self.get_object()
        serializer = OptionSerializer(question.options.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAuthenticated]


''' V1
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

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @decorators.action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        quiz = self.get_object()
        serializer = QuestionSerializer(quiz.questions.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
'''
