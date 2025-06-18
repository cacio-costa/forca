// --- Elementos do DOM ---
const palavraSecretaElement = document.getElementById('palavra-secreta');
const letrasChutadasElement = document.getElementById('letras-chutadas');
const inputPalpite = document.getElementById('input-palpite');
const btnChutar = document.getElementById('btn-chutar');
const mensagemElement = document.getElementById('mensagem');
const membrosCorpo = document.querySelectorAll('.membro-corpo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// --- Variáveis do Jogo ---
const palavras = ["javascript", "programacao", "desenvolvedor", "interface", "algoritmo", "computador", "navegador"];
let palavraSecreta;
let letrasCorretas;
let letrasIncorretas;

function iniciarJogo() {
    let numeroSorteado = Math.random() * palavras.length;
    let indice = Math.floor(numeroSorteado);

    palavraSecreta = palavras[indice];
    letrasCorretas = [];
    letrasIncorretas = [];

    mensagemElement.textContent = '';
    letrasChutadasElement.textContent = '';

    for (let i = 0; i < membrosCorpo.length; i++) {
        membrosCorpo[i].classList.remove('visivel');
    }

    btnChutar.disabled = false;
    inputPalpite.disabled = false;
    btnReiniciar.classList.remove('visivel');

    atualizarPalavraNaTela();
}

function atualizarPalavraNaTela() {
    let letrasDaPalavraSecreta = palavraSecreta.split('');

    palavraSecretaElement.innerHTML = '';
    for (let i = 0; i < letrasDaPalavraSecreta.length; i++) {
        let letraDaPalavra = letrasDaPalavraSecreta[i];

        let letraElement = document.createElement('span');
        letraElement.classList.add('letra');
        if (letrasCorretas.includes(letraDaPalavra)) {
            letraElement.textContent = letraDaPalavra;
        }     

        palavraSecretaElement.appendChild(letraElement);

    }
}

function processarChute() {
    let palpite = inputPalpite.value.toLowerCase().trim();

    // Verifica se o palpite é uma letra válida
    if (!palpite || !/^[a-z]$/.test(palpite)) {
        alert("Por favor, digite uma letra válida.");
        return;
    }

    inputPalpite.value = '';
    inputPalpite.focus();

    if (letrasCorretas.includes(palpite) || letrasIncorretas.includes(palpite)) {
        alert('Você já tentou essa letra!');
        return;
    }

    if (palavraSecreta.includes(palpite)) {
        letrasCorretas.push(palpite);
        atualizarPalavraNaTela();
        verificarVitoria();
    } else {
        letrasIncorretas.push(palpite);
        atualizarForca();
        atualizarLetrasErradas();
    }

}

function atualizarLetrasErradas() {
    letrasChutadasElement.textContent = letrasIncorretas.join(', ');
}

function atualizarForca() {
    let erros = letrasIncorretas.length;

    if (erros > 0) {
        let indiceDoMembroParaExibir = erros - 1;
        membrosCorpo[indiceDoMembroParaExibir].classList.add('visivel');
        verificarDerrota();
    }
}

function verificarVitoria() {
    let todasAsLetras = palavraSecreta.split('');

    let faltaLetras = false;
    for (let i = 0; i < todasAsLetras.length; i++) {
        let letra = todasAsLetras[i];

        if (!letrasCorretas.includes(letra)) {
            faltaLetras = true;
        }
    }

    if (!faltaLetras) {
        exibirMensagemFinal("Você venceu! Parabéns!!!", "vitoria");
    }
}

function verificarDerrota() {
    let erros = letrasIncorretas.length;
    
    if (erros == membrosCorpo.length) {
        exibirMensagemFinal(`Você perdeu! A paravra era ${palavraSecreta}!!!`, 'derrota');
    }
}

function exibirMensagemFinal(msg, tipo) {
    mensagemElement.textContent = msg;
    mensagemElement.classList.add(tipo);

    btnChutar.disabled = true;
    inputPalpite.disabled = true;

    btnReiniciar.classList.add('visivel');
}

btnChutar.onclick = processarChute;
btnReiniciar.onclick = iniciarJogo;

iniciarJogo();