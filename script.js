// Elementos do DOM
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaFinal = document.getElementById('tela-final');
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnSair = document.querySelector('.btn-sair');
const btnComoFunciona = document.getElementById('btn-como-funciona');
const jogoTitulo = document.getElementById('jogo-titulo');
const pontuacaoSpan = document.getElementById('pontuacao');
const pontuacaoTotalSpan = document.getElementById('pontuacao-total');
const alvosContainer = document.getElementById('alvos-container');
const opcoesContainer = document.getElementById('opcoes-container');

// Elementos da nova UI
const temporizadorSpan = document.getElementById('temporizador');
const totalAlvosSpan = document.getElementById('total-alvos');
const totalAlvosFinalSpan = document.getElementById('total-alvos-final');
const tempoTotalSpan = document.getElementById('tempo-total');
const btnVoltarInicio = document.getElementById('btn-voltar-inicio');

// Estado do Jogo
let pontuacao = 0;
let acertos = 0;
let totalAlvos = 0;
let jogoData = null;
let itemArrastando = null;
let tempoRestante = 180; // 3 minutos em segundos
let timerInterval = null;

// Funções do Jogo
async function carregarDadosDoJogo() {
    try {
        const response = await fetch('jogo.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo jogo.json');
        }
        jogoData = await response.json();
        totalAlvos = jogoData.etapas.length;
        if (totalAlvosSpan) totalAlvosSpan.textContent = totalAlvos;
        if (totalAlvosFinalSpan) totalAlvosFinalSpan.textContent = totalAlvos;
        console.log('Dados do jogo carregados com sucesso:', jogoData);
    } catch (error) {
        console.error('Falha ao carregar o jogo:', error);
    }
}

function iniciarJogo() {
    telaInicial.classList.remove('ativa');
    telaJogo.classList.add('ativa');

    pontuacao = 0;
    acertos = 0;
    pontuacaoSpan.textContent = pontuacao;

    if (jogoData) {
        renderizarJogo();
        iniciarTemporizador();
    } else {
        console.error('Dados do jogo ainda não foram carregados!');
    }
}

function iniciarTemporizador() {
    tempoRestante = 180;
    temporizadorSpan.textContent = `${tempoRestante}s`;
    timerInterval = setInterval(() => {
        tempoRestante--;
        temporizadorSpan.textContent = `${tempoRestante}s`;
        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            finalizarJogo(true);
        }
    }, 1000);
}

function renderizarJogo() {
    jogoTitulo.textContent = jogoData.titulo;

    alvosContainer.innerHTML = '';
    opcoesContainer.innerHTML = '';

    const alvos = jogoData.etapas.map(etapa => ({ nome: etapa.nome }));
    const opcoes = jogoData.etapas.map(etapa => ({ nome: etapa.nome, descricao: etapa.descricao }));

    opcoes.sort(() => Math.random() - 0.5);

    alvos.forEach(alvo => {
        const alvoDiv = document.createElement('div');
        alvoDiv.classList.add('alvo');
        alvoDiv.dataset.nome = alvo.nome;

        const nomeEtapa = document.createElement('span');
        nomeEtapa.classList.add('nome-etapa');
        nomeEtapa.textContent = alvo.nome;
        alvoDiv.appendChild(nomeEtapa);

        alvoDiv.addEventListener('dragover', permitirDrop);
        alvoDiv.addEventListener('drop', handleDrop);
        alvoDiv.addEventListener('dragleave', handleDragLeave);
        alvosContainer.appendChild(alvoDiv);
    });

    opcoes.forEach(opcao => {
        const opcaoDiv = document.createElement('div');
        opcaoDiv.classList.add('opcao');
        opcaoDiv.setAttribute('draggable', 'true');
        opcaoDiv.dataset.nome = opcao.nome;
        opcaoDiv.textContent = opcao.descricao;
        opcaoDiv.addEventListener('dragstart', handleDragStart);
        opcaoDiv.addEventListener('dragend', handleDragEnd);
        opcoesContainer.appendChild(opcaoDiv);
    });
}

// Lógica de Drag and Drop
function handleDragStart(e) {
    itemArrastando = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.nome);
    e.target.classList.add('arrastando');
}

function handleDragEnd(e) {
    e.target.classList.remove('arrastando');
}

function permitirDrop(e) {
    e.preventDefault();
    this.classList.add('dragover');
}

function handleDragLeave(e) {
    this.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('dragover');

    if (this.classList.contains('acerto')) {
        return;
    }

    const nomeArrastado = e.dataTransfer.getData('text/plain');
    const nomeAlvo = this.dataset.nome;

    if (nomeArrastado === nomeAlvo) {
        pontuacao += 1;
        acertos += 1;
        pontuacaoSpan.textContent = pontuacao;

        this.classList.add('acerto');
        itemArrastando.classList.add('acerto');
        itemArrastando.setAttribute('draggable', 'false');

        const descricaoDiv = document.createElement('div');
        descricaoDiv.classList.add('descricao-acertada');
        descricaoDiv.textContent = itemArrastando.textContent;
        this.appendChild(descricaoDiv);
        
        itemArrastando.remove();

        if (acertos === totalAlvos) {
            setTimeout(() => finalizarJogo(false), 1000);
        }

    } else {
        itemArrastando.classList.add('erro');
        this.classList.add('erro');

        setTimeout(() => {
            itemArrastando.classList.remove('erro');
            this.classList.remove('erro');
        }, 500);
    }
    itemArrastando = null;
}

function finalizarJogo(tempoEsgotado = false) {
    clearInterval(timerInterval);
    telaJogo.classList.remove('ativa');
    telaFinal.classList.add('ativa');

    pontuacaoTotalSpan.textContent = pontuacao;
    tempoTotalSpan.textContent = `${180 - tempoRestante}s`;

    if (tempoEsgotado) {
        document.querySelector('.titulo-final').textContent = 'Tempo Esgotado!';
        document.querySelector('.mensagem-final').textContent = 'Você pode tentar novamente.';
        document.querySelector('.titulo-final').style.color = 'var(--cor-erro)';
    } else {
        document.querySelector('.titulo-final').textContent = 'Parabéns!';
        document.querySelector('.mensagem-final').textContent = 'Você concluiu o jogo do ciclo da água.';
        document.querySelector('.titulo-final').style.color = 'var(--cor-sucesso)';
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
}

function reiniciarJogo() {
    telaFinal.classList.remove('ativa');
    telaJogo.classList.add('ativa');

    pontuacao = 0;
    acertos = 0;
    pontuacaoSpan.textContent = pontuacao;

    if (jogoData) {
        renderizarJogo();
        iniciarTemporizador();
    } else {
        console.error('Dados do jogo ainda não foram carregados!');
    }
}

function voltarParaInicio() {
    telaJogo.classList.remove('ativa');
    telaFinal.classList.remove('ativa');
    telaInicial.classList.add('ativa');
    
    clearInterval(timerInterval);
}

// Event Listeners
if (btnSair) {
    btnSair.addEventListener('click', voltarParaInicio);
}

if (btnComoFunciona) {
    btnComoFunciona.addEventListener('click', () => {
        const instrucoesSection = document.querySelector('.instrucoes');
        if (instrucoesSection) {
            instrucoesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Inicializa o jogo
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosDoJogo();
    if (btnIniciar) {
        btnIniciar.addEventListener('click', iniciarJogo);
    }
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciarJogo);
    }
    if (btnVoltarInicio) {
        btnVoltarInicio.addEventListener('click', voltarParaInicio);
    }
});