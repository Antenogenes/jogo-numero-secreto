// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto - Tê';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto =  gerarNumeroAleatorio();
let numeroTentativa = 1;
let textoTentativa;

mensagemInicial();

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto - Tê')
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`)
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
} 

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
 
        textoTentativa = `Você descobriu o número secreto com ${numeroTentativa} ${numeroTentativa > 1 ? "tentativas" : "tentativa"}`

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', textoTentativa); //Como a function espera uma string não é viavel passar o tamplate string aqui
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        numeroTentativa ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }  
    
    //includes verifica se o elemente está na lista
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido); //push add item to list
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    } 
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativa = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

//teste