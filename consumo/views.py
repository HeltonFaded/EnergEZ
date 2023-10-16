import matplotlib 
matplotlib.use('Agg') 
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, FileResponse
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.backends.backend_pdf import PdfPages
from io import BytesIO
from django.views.decorators.csrf import csrf_exempt
from clientes.models import Dispositivos
import json
import io
from django.http import JsonResponse
from .models import TarifaEnergia
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import matplotlib.pyplot as plt

def consumo (request):
    return render (request,'consumo.html')


@csrf_exempt
def consumo_data(request):
    
        dispositivos_queryset = Dispositivos.objects.all()
        tarifas_queryset = TarifaEnergia.objects.all()

        
        khw_values = [dispositivo.KHW for dispositivo in dispositivos_queryset]
        marcas = [dispositivo.marca for dispositivo in dispositivos_queryset]
        cidades = [tarifa.cidade for tarifa in tarifas_queryset]
        estados = [tarifa.estado for tarifa in tarifas_queryset]
        tarifas = [tarifa.tarifa for tarifa in tarifas_queryset]


        
        dados = {
            'marcas': marcas,
            'khw_values': khw_values,
            'cidades': cidades,
            'estados': estados,
            'tarifas': tarifas,
        }
        return JsonResponse(dados)



@csrf_exempt
def gerarPdf(request):
    dados_json = consumo_data(request).content.decode('utf-8')
    dados = json.loads(dados_json)

    cidade_id = int(request.GET.get('cidadeId'))
    print(f'Cidade ID recebido: {cidade_id}')

    estado_selecionado = dados['estados'][cidade_id]
    tarifa_selecionada = dados['tarifas'][cidade_id]
    custo_por_hora = [(kwh / 1000) * tarifa_selecionada for kwh in dados['khw_values']]

    index_maior_custo = custo_por_hora.index(max(custo_por_hora))
    index_menor_custo = custo_por_hora.index(min(custo_por_hora))

    dispositivo_maior_custo = dados['marcas'][index_maior_custo]
    dispositivo_menor_custo = dados['marcas'][index_menor_custo]

    
    gasto_mensal_estimado = [custo_por_hora[i] * 720 for i in range(len(custo_por_hora))]

    plt.figure(figsize=(12, 8))
    plt.bar(dados['marcas'], custo_por_hora, alpha=0.7, edgecolor='black', color='#4B0082', label='Custo por Hora (R$)')
    plt.axhline(y=custo_por_hora[index_maior_custo], color='red', linewidth=1, linestyle='--', label=f'Linha do Maior Custo ({dispositivo_maior_custo})')
    plt.axhline(y=custo_por_hora[index_menor_custo], color='green', linewidth=1, linestyle='--', label=f'Linha do Menor Custo ({dispositivo_menor_custo})')
    plt.title(f'Custo de Energia por Hora para Dispositivos em {estado_selecionado} com o preço de KHW (R$){tarifa_selecionada}', fontsize=14)
    plt.ylabel('Custo de Energia por Hora (R$)', fontsize=12)
    plt.xticks(dados['marcas'], rotation=45, ha='right', fontsize=10)  
    plt.grid(True, linestyle='-', linewidth=0.8, alpha=0.3)
    plt.gca().set_facecolor('#f0f0f0')
    plt.legend()

    
    for i, gasto in enumerate(gasto_mensal_estimado):
        plt.text(i, -0.05, f'R$ {gasto:.2f} mensais', ha='center', fontsize=8)
    
    buffer = io.BytesIO()
    plt.tight_layout(pad=1)
    plt.savefig(buffer, format='pdf')
    buffer.seek(0)
    plt.close()

    response = HttpResponse(buffer, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename=relatorio_{estado_selecionado}.pdf'
 
    return response