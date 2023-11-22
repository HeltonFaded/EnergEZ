document.addEventListener("DOMContentLoaded", function () {
  getAndRenderChartData();

  document.getElementById("botao-envio").addEventListener("click", function () {
    submitFeedbackAndUpdateCharts();
  });
});

function getAndRenderChartData() {
  fetch("/feedbacks/grafico_feedback/")
    .then((response) => response.json())
    .then((data) => {

      
      renderChart("visualChart", data.visual);
      renderChart("otimizadoChart", data.otimizado);
      renderChart("intuitividadeChart", data.intuitividade);
      renderChart("propostaChart", data.proposta);
      renderChart("perfilChart", data.perfil);
      renderChart("moradoresChart", data.moradores);
      renderChart("gastoChart", data.gasto);
      console.log(votes)

      console.log(votes)


      initializeFeedbackCharts();  
    })
    .catch((error) => {
      console.error("Erro ao obter dados do gráfico:", error);
    });
}

function renderChart(chartId, data) {
  console.log(`Renderizando gráfico ${chartId} com dados:`, data);

  if (!data || !Array.isArray(data)) {
    console.error(`Dados inválidos para o gráfico ${chartId}. Esperava-se um array de strings.`);
    return;
  }

  const chartData = countVotes(data);
  console.log(`Dados contados para o gráfico ${chartId}:`, chartData);

  const chart = createChart(chartId, chartData.options);
  updateChartData(chart, chartData.votes);
}
function countVotes(data) {
  const countMap = {};

  data.forEach((option) => {
    countMap[option] = (countMap[option] || 0) + 1;
  });

  const options = Object.keys(countMap);
  const votes = options.map((option) => countMap[option]);

  console.log(`Opções para votos: ${options}`);
  options.forEach((option) => {
    console.log(`Quantidade de votos para '${option}': ${countMap[option]}`);
  });

  return {
    options,
    votes,
  };
}
function updateChartData(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

function initializeFeedbackCharts() {

  const visualChart = createChart("visualChart", ["Sim", "Não"]);
  const otimizadoChart = createChart("otimizadoChart", ["Sim", "Não"]);
  const intuitividadeChart = createChart("intuitividadeChart", ["Ótima", "Boa", "Razoável", "Confuso", "Muito Confuso"]);
  const propostaChart = createChart("propostaChart", ["Muito Boa", "Boa", "Indiferente", "Ruim"]);
  const perfilChart = createChart("perfilChart", ["Casa", "Apartamento"]);
  const moradoresChart = createChart("moradoresChart", ["1", "2-4", "5 ou mais"]);
  const gastoChart = createChart("gastoChart", ["Sim, e estou satisfeito", "Sim, e não estou satisfeito", "Não sei meu gasto em energia elétrica"]);
  const propostaEnergeazyChart = createChart("propostaEnergeazyChart", ["Muito boa", "Boa", "Indiferente", "Ruim"]);
  const intuitividadeEnergeazyChart = createChart("intuitividadeEnergeazyChart", ["Ótima", "Boa", "Razoável", "Confuso", "Muito confuso"]);
  const otimizadoEnergeazyChart = createChart("otimizadoEnergeazyChart", ["Sim", "Não"]);
  const gostoVisualEnergeazyChart = createChart("gostoVisualEnergeazyChart", ["Sim", "Não"]);

}


function submitFeedbackAndUpdateCharts() {
  submitFeedback("visualChart", "visual");
  submitFeedback("otimizadoChart", "otimizado");
  submitFeedback("intuitividadeChart", "intuitividade");
  submitFeedback("propostaChart", "proposta");
  submitFeedback("perfilChart", "perfil");
  submitFeedback("moradoresChart", "moradores");
  submitFeedback("gastoChart", "gasto");
  submitFeedback("propostaEnergeazyChart", "propostaEnergeazy");
  submitFeedback("intuitividadeEnergeazyChart", "intuitividadeEnergeazy");
  submitFeedback("otimizadoEnergeazyChart", "otimizadoEnergeazy");
  submitFeedback("gostoVisualEnergeazyChart", "gostoVisualEnergeazy");
}
function createChart(chartId, options) {
  const canvas = document.getElementById(chartId);

  if (!canvas) {
    console.error(`Canvas element with id '${chartId}' not found.`);
    return null;
  }

  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  const chart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: options,
      datasets: [{
        label: 'Opnião de outros usuarios',
        data: options.map(() => 0),
        backgroundColor: 'purple',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Arial',
              size: 21,
            },
            color: 'black'
          },
          grid: {
            color: 'rgba(128, 128, 128, 0.5)'
          }
        },
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
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Arial',
              size: 21,
            },
            color: 'black'
          }
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.5)'
        }
      }
    }
  });

  return chart;
}
