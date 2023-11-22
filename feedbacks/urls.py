from django.urls import path
from . import views

urlpatterns = [
    path('',views.feedbacks, name= "feedback"),
    path('grafico_feedback/',views.grafico_feedback, name='grafico_feedback'),
]

