document.addEventListener('DOMContentLoaded', function () {
    fetch('/consumo/consumo_data', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            var cidadeEstadoSelect = document.getElementById('cidade-estado');
            var cidadeId;
            cidadeEstadoSelect.name = 'cidade';

            for (var i = 0; i < data.estados.length; i++) {
                var option = document.createElement('option');
                option.value = data.estados[i];
                option.textContent = data.estados[i];
                cidadeEstadoSelect.appendChild(option);
            }

            var divContainer = document.getElementById('grafico-de-barras-container');
            var canvas = document.createElement('canvas');
            canvas.id = 'grafico-de-barras';
            divContainer.appendChild(canvas);

            var infoDiv = document.createElement('div');
            infoDiv.className = 'info';
            divContainer.appendChild(infoDiv);

            var ctx = canvas.getContext('2d');
            var myChart;

            function renderizarGrafico() {
                var estadoSelecionado = cidadeEstadoSelect.value;
                var tarifaSelecionada = data.tarifas[data.estados.indexOf(estadoSelecionado)];
                var custoPorHora = data.khw_values.map(kwh => (kwh / 1000) * tarifaSelecionada);

                if (myChart) {
                    myChart.destroy();
                }

                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data.marcas,
                        datasets: [{
                            label: 'Custo de Energia por Hora (R$)',
                            data: custoPorHora,
                            backgroundColor: 'purple',
                            borderColor: 'rgba(128, 0, 128, 0.8)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                ticks: {
                                  font: {
                                    family: 'Arial',
                                    size: 21
                                  },
                                  color: 'black'
                                },
                                grid: {
                                    color: 'rgba(128, 128, 128, 0.5)'
                                }
                                
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    font: {
                                        family: 'Arial',
                                        size: 21
                                      },

                                    callback: function (value, index, values) {
                                        return 'R$ ' + value.toFixed(2);
                                        
                                    },
                                    color: 'black' 
                                },
                                grid: {
                                    color: 'rgba(128, 128, 128, 0.5)'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                    font: {
                                        weight: 'bold',
                                        size: 21
                                    },
                                    color: 'black' 
                                    
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        var label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        label += 'R$ ' + context.parsed.y.toFixed(2);
                                        return label;
                                    }
                                }
                            }
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutQuart'
                        }
                    }
                });

                infoDiv.innerHTML = '';

                var indexMaiorCusto = custoPorHora.indexOf(Math.max(...custoPorHora));
                var dispositivoMaiorCusto = data.marcas[indexMaiorCusto];

                var indexMenorCusto = custoPorHora.indexOf(Math.min(...custoPorHora));
                var dispositivoMenorCusto = data.marcas[indexMenorCusto];

                infoDiv.innerHTML = `O dispositivo que custou mais foi ${dispositivoMaiorCusto} com um custo de R$ ${custoPorHora[indexMaiorCusto].toFixed(2)} por hora. <br> O dispositivo que custou menos foi ${dispositivoMenorCusto} com um custo de R$ ${custoPorHora[indexMenorCusto].toFixed(2)} por hora.`;
            }

            renderizarGrafico();
            cidadeEstadoSelect.addEventListener('change', function () {
                cidadeId = cidadeEstadoSelect.selectedIndex;
                renderizarGrafico();
                console.log('Índice da escolha do usuário para cidade-estado:', cidadeId);

                fetch(`/consumo/gerar_pdf?cidadeId=${cidadeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.cidadeId);

                    })
                    .catch(error => {
                        console.error(error);
                    });
                document.getElementById('download').addEventListener('click', function () {
                    window.location.href = `/consumo/gerar_pdf?cidadeId=${cidadeId}`;
                });
            });
        });
});
