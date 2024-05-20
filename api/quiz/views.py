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
        request.data['creator'] = request.user.uuid

        questions_data = request.data.pop('questions', [])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quiz = serializer.save()

        for question_data in questions_data:
            options_data = question_data.pop('options', [])
            question = Question.objects.create(quiz=quiz, **question_data)
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)

        return response.Response(serializer.data, status=status.HTTP_201_CREATED)  # noqa E501

    def destroy(self, request, *args, **kwargs):
        quiz = Quiz.objects.get(pk=kwargs['pk'])
        if quiz is None:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        if quiz.creator != request.user:
            return response.Response(status=status.HTTP_403_FORBIDDEN)
        quiz.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    @decorators.action(detail=False, methods=['get'])
    def mine(self, request):
        queryset = self.queryset.filter(creator=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)

    @decorators.action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        quiz = self.get_object()
        serializer = QuestionSerializer(quiz.questions.all(), many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    # a method to togle the is_published field of a quiz
    @decorators.action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        print('publish')
        quiz = Quiz.objects.get(pk=pk)
        print(quiz)
        if quiz is None:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        if quiz.creator != request.user:
            return response.Response(status=status.HTTP_403_FORBIDDEN)
        quiz.is_published = not quiz.is_published
        quiz.save()
        return response.Response(status=status.HTTP_200_OK)


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
