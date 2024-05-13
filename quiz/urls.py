from django.urls import path
from .views import QuizAPIView, QuestionAPIView, OptionAPIView

urlpatterns = [
    path('quiz/', QuizAPIView.as_view(), name='quiz'),
    path('question/', QuestionAPIView.as_view(), name='question'),
    path('option/', OptionAPIView.as_view(), name='option'),
]
