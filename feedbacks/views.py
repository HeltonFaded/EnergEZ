from django.shortcuts import render,redirect
from django.http import HttpResponseRedirect,JsonResponse
from .models import Feedback


def feedbacks(request):
    if request.method == 'POST':
        user_name = request.POST.get('nomeUsuario')  
        visual = request.POST.get('visual')
        otimizado = request.POST.get('otimizado')
        intuitividade = request.POST.get('intuitividade')
        proposta = request.POST.get('proposta')
        perfil = request.POST.get('perfil')
        moradores = request.POST.get('moradores')
        gasto = request.POST.get('gasto')
        proposta_energeazy = request.POST.get('propostaEnergeazy')
        intuitividade_energeazy = request.POST.get('intuitividadeEnergeazy')
        otimizado_energeazy = request.POST.get('otimizadoEnergeazy')
        gosto_visual_energeazy = request.POST.get('gostoVisualEnergeazy')

        feedback = Feedback(
            user_name=user_name,
            visual=visual,
            otimizado=otimizado,
            intuitividade=intuitividade,
            proposta=proposta,
            perfil=perfil,
            moradores=moradores,
            gasto=gasto,
            proposta_energeazy=proposta_energeazy,
            intuitividade_energeazy=intuitividade_energeazy,
            otimizado_energeazy=otimizado_energeazy,
            gosto_visual_energeazy=gosto_visual_energeazy
        )
        feedback.save()
        

       

    return render(request, 'feedbacks.html')


    
def grafico_feedback(request):
    feedbacks_queryset = Feedback.objects.all()

    dados = {
        'user_names': [feedback.user_name for feedback in feedbacks_queryset],
        'visual': [feedback.visual for feedback in feedbacks_queryset],
        'otimizado': [feedback.otimizado for feedback in feedbacks_queryset],
        'intuitividade': [feedback.intuitividade for feedback in feedbacks_queryset],
        'proposta': [feedback.proposta for feedback in feedbacks_queryset],
        'perfil': [feedback.perfil for feedback in feedbacks_queryset],
        'moradores': [feedback.moradores for feedback in feedbacks_queryset],
        'gasto': [feedback.gasto for feedback in feedbacks_queryset],
        'proposta_energeazy': [feedback.proposta_energeazy for feedback in feedbacks_queryset],
        'intuitividade_energeazy': [feedback.intuitividade_energeazy for feedback in feedbacks_queryset],
        'otimizado_energeazy': [feedback.otimizado_energeazy for feedback in feedbacks_queryset],
        'gosto_visual_energeazy': [feedback.gosto_visual_energeazy for feedback in feedbacks_queryset],
    }
    print(dados)

    return JsonResponse(dados)