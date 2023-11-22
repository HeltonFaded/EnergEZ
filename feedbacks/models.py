from django.db import models

class Feedback(models.Model):
    user_name = models.CharField(max_length=255)
    visual = models.CharField(max_length=50)
    otimizado = models.CharField(max_length=50)
    intuitividade = models.CharField(max_length=50)
    proposta = models.CharField(max_length=50)
    perfil = models.CharField(max_length=50)
    moradores = models.CharField(max_length=50)
    gasto = models.CharField(max_length=50)
    proposta_energeazy = models.CharField(max_length=50)
    intuitividade_energeazy = models.CharField(max_length=50)
    otimizado_energeazy = models.CharField(max_length=50)
    gosto_visual_energeazy = models.CharField(max_length=50)

    def __str__(self):
        return self.user_name