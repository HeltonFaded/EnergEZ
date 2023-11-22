from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clientes/',include("clientes.urls")),
    path('', include('home.urls')), 
    path('consumo/',include('consumo.urls')),
    path('noticia/',include('noticias.urls')),
    path('feedbacks/',include('feedbacks.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)