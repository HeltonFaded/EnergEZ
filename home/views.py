from django.shortcuts import render

def pagina_inical (request):
    return render (request,'pagina_inicial.html')