from django.urls import path
from . import views

urlpatterns = [
    path('',views.consumo, name="consumo" ),
    path('consumo_data',views.consumo_data, name= "consumo_data"),
    path('gerar_pdf',views.gerarPdf, name = "gerar_pdfs"),
    
]

