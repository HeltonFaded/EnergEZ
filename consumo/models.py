
from django.db import models

class TarifaEnergia(models.Model):
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    tarifa = models.FloatField()

    def __str__(self):
        return f"{self.cidade}, {self.estado} - Tarifa: {self.tarifa} R$/kWh"





