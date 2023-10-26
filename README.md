# Energeasy

Energeasy é um projeto desenvolvido por Helton dos Santos França, com contribuições de Vinícius Marques Ribeiro, somos orientados e mentorados pelo Prof. MSc. Cloves Rocha.
- Nosso objetivo conscientizar os usuários sobre diferentes conceitos de energia, incluindo elétrica, nuclear e solar. 
- Além disso, o projeto visa desmistificar informações errôneas sobre energia, permitir o cadastro de dispositivos e realizar cálculos de economia de energia.

## Instalação

Para instalar o Energeasy, siga estas etapas:

1. Clone este repositório.
2. Certifique-se de ter o Python e o Django instalados.
3. Execute o comando `pip install -r requirements.txt` para instalar as dependências.

## Uso

Após a instalação, siga estas etapas para utilizar o Energeasy:

1. Execute o servidor Django localmente.
2. Acesse o aplicativo através do navegador da web.
3. Cadastre os dispositivos e explore os recursos disponíveis para aprender sobre diferentes formas de energia e calcular a economia de energia.

## Exemplo de Código

Aqui está um exemplo de código utilizado no projeto:

```python
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

