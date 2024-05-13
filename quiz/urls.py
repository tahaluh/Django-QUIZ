from django.urls import path
from .views import QuizzesAPIView, QuizAPIView, QuestionsAPIView, QuestionAPIView, OptionsAPIView, OptionAPIView  # noqa E501


urlpatterns = [
    path('quiz/', QuizzesAPIView.as_view(), name='quizes'),
    path('quiz/<uuid:pk>/', QuizAPIView.as_view(), name='quiz'),

    path('question/', QuestionsAPIView.as_view(), name='questions'),
    path('question/<uuid:pk>/', QuestionAPIView.as_view(), name='question'),

    path('option/', OptionsAPIView.as_view(), name='options'),
    path('option/<uuid:pk>/', OptionAPIView.as_view(), name='option'),
]
