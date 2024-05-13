from django.urls import path
from .views import QuizzesAPIView, QuizAPIView, QuestionsAPIView, QuestionAPIView, OptionsAPIView, OptionAPIView  # noqa E501
from .views import QuizViewSet, QuestionViewSet, OptionViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('quiz', QuizViewSet)
router.register('question', QuestionViewSet)
router.register('option', OptionViewSet)

urlpatterns = [
    path('quiz/', QuizzesAPIView.as_view(), name='quizes'),
    path('quiz/<uuid:pk>/', QuizAPIView.as_view(), name='quiz'),
    path('quiz/<uuid:quiz_pk>/questions/',
         QuestionsAPIView.as_view(), name='quiz_questions'),

    path('question/', QuestionsAPIView.as_view(), name='questions'),
    path('question/<uuid:pk>/', QuestionAPIView.as_view(), name='question'),
    path('question/<uuid:question_pk>/options/',
         OptionsAPIView.as_view(), name='question_options'),

    path('option/', OptionsAPIView.as_view(), name='options'),
    path('option/<uuid:pk>/', OptionAPIView.as_view(), name='option'),
]
