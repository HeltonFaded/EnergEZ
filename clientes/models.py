from django.db import models

class Dispositivos(models.Model):
    KHW = models.FloatField(max_length=4)
    marca = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    icone = models.ImageField(upload_to='icones')
    tipo = models.CharField(max_length=30)
    def __str__(self) -> str:
        return str(self.KHW)
    

    