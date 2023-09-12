from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import Dispositivos
from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse 
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt

def clientes(request):
    if request.method == "GET":
        return render(request, 'clientes.html')
    
    elif request.method == "POST":
        KHW = request.POST.get('khw')
        marca = request.POST.get('marca')
        modelo = request.POST.get('modelo')
        icone = request.FILES.get('icone')
        tipo = request.POST.get('tipo')

        disp = Dispositivos(KHW=KHW, marca=marca, modelo=modelo, icone=icone, tipo=tipo)
        disp.save()
        messages.success(request, 'Dispositivo cadastrado com sucesso',extra_tags='success-message')
        return render(request, 'clientes.html', {'disp': disp})

    
    

def gerenciar(request):
    dispositivo_list = Dispositivos.objects.all()
    return render(request, 'gerenciar.html',{'dispositivos': dispositivo_list})

def attDisp(request):
    idDispositivo= request.POST.get("id_dispositivo")
    dispositivo = Dispositivos.objects.filter(id=idDispositivo)
    dispositivoJson = json.loads(serializers.serialize('json',dispositivo))[0]['fields']
    idDisp = json.loads(serializers.serialize('json',dispositivo))[0]['pk']
    data = {'dispositivo': dispositivoJson,"idDisp": idDisp}

    return JsonResponse (data)

@csrf_exempt
def atualiza_Disp(request, id):
        dispositivo = get_object_or_404(Dispositivos, id=id)

        tipo = request.POST.get('tipo')
        marca = request.POST.get('marca')
        potencia = request.POST.get('potencia')
        modelo = request.POST.get('modelo')

        dispositivo.tipo = tipo
        dispositivo.marca = marca
        dispositivo.KHW = potencia
        dispositivo.modelo = modelo
        icone = request.FILES.get('icone')
        if icone:
            dispositivo.icone = icone

    

        dispositivo.save()

        data = {'status': '200', 'message': 'Dispositivo atualizado com sucesso'}
        redirect(reverse('clientes'))
        messages.success(request, 'Dispositivo atualizado com sucesso',extra_tags='success-message')
        return JsonResponse(data)
   
def delete_disp(request,id):
     try:
          dispositivo = Dispositivos.objects.get(id=id)
          dispositivo.delete()
          messages.error(request, 'Dispositivo excluído com sucesso', extra_tags='warning-message')
          return redirect(reverse('clientes'))
     
     except:
          messages.warning(request, 'Dispositivo não encontrado', extra_tags='warning-message')
          return redirect(reverse('clientes'))