from django.urls import path
from . import views




urlpatterns = [
    path('',views.clientes, name="clientes" ),
    path('gerenciarDispositivo/',views.gerenciar, name="gerenciar" ),
    path('gerencia_dispositivo',views.attDisp, name= "gerencia"),
    path('att_disp/<int:id>',views.atualiza_Disp, name="att_disp"),
    path('delete_disp/<int:id>',views.delete_disp, name="delete_disp")
    
]

