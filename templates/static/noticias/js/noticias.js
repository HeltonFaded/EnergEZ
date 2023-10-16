const carouselImages = document.querySelectorAll('.carousel-image');
const descricaoImagemElement = document.getElementById('descricao-imagem');
const cabecalioElement = document.createElement('h1');
cabecalioElement.classList.add('cabecalio');
const tituloElement = document.getElementById('titulo');
tituloElement.appendChild(cabecalioElement);

const descricoes = {
    led: {
        descricaoImagem: 'As luzes LED (Light Emitting Diodes) apresentam uma série de vantagens significativas em relação às tecnologias de iluminação tradicionais. Em primeiro lugar, a eficiência energética das luzes LED é notável. Elas consomem consideravelmente menos energia do que as lâmpadas incandescentes e fluorescentes, o que resulta em economia substancial nas contas de eletricidade a longo prazo.',
        descricaoH1: 'Os beneficios de luzes led'
    },
    inducao: {
        descricaoImagem: "O carregamento de celulares por indução, ou carregamento sem fio, traz comodidade e simplicidade ao nosso dia a dia. Ao eliminar a necessidade de cabos, oferece uma solução prática para manter nossos dispositivos carregados. Basta colocar o celular na base de carregamento e pronto, sem preocupações com plugues e tomadas. Além disso, é uma opção segura e eficiente, contribuindo para uma experiência de carregamento mais fácil e sem complicações.",
        descricaoH1: 'A eficiencia do carregamento por indução'
    },
    solar: {
        descricaoImagem: "Os mitos sobre energia solar, como a ideia de que não funciona em dias nublados ou é inacessível devido aos custos elevados, estão sendo desmentidos pelos avanços tecnológicos. Com painéis solares eficientes, financiamento acessível e sistemas de armazenamento de energia, a energia solar tornou-se uma opção prática e econômica para muitos, desafiando essas concepções equivocadas.",
        descricaoH1: 'Entenda melhor a energia solar'
    },
    g5: {
        descricaoImagem: "Os mitos sobre o 5G, como a associação com o câncer, geram preocupações infundadas. Não há evidências científicas sólidas que comprovem essas alegações. Além disso, o 5G não substituirá instantaneamente o 4G; ambas as tecnologias coexistirão para atender a diferentes demandas. É essencial confiar em fontes confiáveis para entender verdadeiramente os impactos do 5G.",
        descricaoH1: 'A verdade sobre o 5G'
    },
    nuclear: {
        descricaoImagem: "Os mitos sobre a energia nuclear frequentemente suscitam preocupações sobre segurança e poluição. Muitas pessoas acreditam erroneamente que acidentes nucleares são inevitáveis, ignorando as múltiplas camadas de segurança nas usinas modernas. Outro equívoco é que a energia nuclear é altamente poluente, ignorando seu baixo impacto nas emissões de gases de efeito estufa. Além disso, há a ideia de que o armazenamento de resíduos nucleares é irresolúvel, apesar do desenvolvimento contínuo de tecnologias para gerenciar esses resíduos. É crucial entender que, apesar dos desafios, a energia nuclear é uma fonte valiosa e relativamente limpa, desempenhando um papel importante na transição para uma matriz energética mais sustentável",
        descricaoH1: 'Os mitos sobre energia nuclear'
    },
    lazer: {
        descricaoImagem:"Economizar energia sem abrir mão do lazer é possível com práticas simples. Optar por eletrodomésticos eficientes, regular o ar condicionado, desligar eletrônicos não utilizados e utilizar lâmpadas LED são maneiras eficazes de reduzir o consumo. Além disso, controlar a luz natural com cortinas e desligar a TV quando não estiver em uso são hábitos que fazem a diferença. Pequenas mudanças cotidianas possibilitam economias significativas, permitindo um estilo de vida sustentável e econômico, mantendo o lazer intacto.",
        descricaoH1: 'Economize sem abrir mão do lazer'
    }
};
let currentIndex = 0;
const intervaloInicial = 1;
const intervaloPadrao = 70000;

function moveCarousel(index) {
    for (let i = 0; i < carouselImages.length; i++) {
        carouselImages[i].style.display = 'none';
    }
    carouselImages[index].style.display = 'block';

    const descricaoId = carouselImages[index].getAttribute('data-descricao');
    const descricao = descricoes[descricaoId] || { descricaoImagem: 'Descrição não disponível', descricaoH1: 'Descrição não disponível' };

    if (descricaoImagemElement) {
        descricaoImagemElement.textContent = descricao.descricaoImagem;
    }

    cabecalioElement.textContent = descricao.descricaoH1;

    currentIndex = index;
}

function avancarSlideAutomaticamente() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    moveCarousel(currentIndex);
}

setTimeout(function () {
    avancarSlideAutomaticamente();
    setInterval(avancarSlideAutomaticamente, intervaloPadrao);
}, intervaloInicial);
