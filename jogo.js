const elementos = {
    telaInicial: document.getElementById("inicial"),
    telaCadastro: document.getElementById("cadastro"), 
    telaJogo: document.getElementById("jogo"),
    telaMensagem: document.querySelector(".mensagem"),
    textoMensagem: document.querySelector(".mensagem .texto"),
    teclado: document.querySelector(".teclado"),
    palavra: document.querySelector(".palavra"),
    dica: document.querySelector(".dica"),
    botoes: {
        facil: document.querySelector(".botao-facil"),
        medio: document.querySelector(".botao-medio"),
        dificil: document.querySelector(".botao-dificil"),
        cadastrar: document.querySelector(".botao-cadastrar"),
        realizarCadastro: document.querySelector(".botao-realizar-cadastro"),
        voltar: document.querySelector(".botao-voltar"),
        reiniciar: document.querySelector(".reiniciar"),
    }, 
    campos:{
        dificuldade:{
            facil: document.getElementById("facil"),
            medio: document.getElementById("medio"),
            dificil: document.getElementById("dificil"),
        },
        palavra: document.getElementById("palavra"),
        dica: document.getElementById("dica"),
    },
    boneco:[
        document.querySelector(".boneco-cabeca"),
        document.querySelector(".boneco-corpo"),
        document.querySelector(".boneco-braco-esquerdo"),
        document.querySelector(".boneco-braco-direito"),
        document.querySelector(".boneco-perna-esquerda"),
        document.querySelector(".boneco-perna-direita"),
    ]
}

const palavras = {
    facil:[
        {
            palavra: "série",
            dica: "Game Of Thrones é a melhor..."
        },
        {
            palavra: "ímpar",
            dica: "Se não é par é..."
        },
    ],
    medio:[
        {
            palavra: "sérieaa",
            dica: "Game Of Thrones é a melhor..."
        },
        {
            palavra: "ímparaa",
            dica: "Se não é par é..."
        },
    ],
    dificil:[
        {
            palavra: "sérieaaaa",
            dica: "Game Of Thrones é a melhor..."
        },
        {
            palavra: "ímparaaaa",
            dica: "Se não é par é..."
        },
    ],
}

function selecionarLetra(letra){
    console.log(jogo.acabou());
    if(!jogo.jogadas.includes(letra) && !jogo.acabou()){
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);

        const button = document.querySelector(`.botao-${letra}`);
        button.classList.add(acertou ? "certo" : "errado");

        mostrarPalavra();

        if(!acertou){
            mostrarErro();
        }

        if(jogo.ganhou()){
            mostrarMensagem(true);
        } else if(jogo.perdeu()){
            mostrarMensagem(false);
        }
    }

}
function criarTeclado(){
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    elementos.teclado.textContent = '';

    for(const letra of letras){
        const button = document.createElement('button');
        button.appendChild(document.createTextNode(letra.toUpperCase()));
        button.classList.add(`botao-${letra}`);
        elementos.teclado.appendChild(button);

        button.addEventListener('click', () => {
            selecionarLetra(letra);
        });
    }
}

function mostrarErro(){

}

function mostrarMensagem(vitoria){

}

function abrirTelaCadastroPalavra(){

}

function voltarInicio(){

}

function cadastrarPalavra(){

}

function sortearPalavra(){
    const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length);
    const palavra = palavras[jogo.dificuldade][i].palavra;
    const dica =  palavras[jogo.dificuldade][i].dica;

    jogo.definirPalavra(palavra, dica);

    console.log(jogo.palavra.original);
    console.log(jogo.palavra.dica);

    return jogo.palavra.original;

}

function mostrarPalavra(){
    elementos.dica.textContent = jogo.palavra.dica;
    elementos.palavra.textContent = '';

    for(let i=0; i<jogo.acertos.length; i++){
        const letra = jogo.acertos[i].toUpperCase();
        elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`
    }
}

function novoJogo(){
    jogo = {
        dificuldade: undefined, 
        palavra:{
            original: undefined,
            semAcertos: undefined,
            tamanho: undefined,
            dica: undefined,
        },
        acertos: undefined,
        jogadas:[],
        chances: 6,
        definirPalavra: function(palavra, dica){
            this.palavra.original = palavra;
            this.palavra.tamanho = palavra.length;
            this.acertos = "";

            this.palavra.semAcertos = this.palavra.original.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            this.palavra.dica = dica;

            for(let i=0; i< this.palavra.tamanho; i++){
                this.acertos += " ";
            }
        }, 
        jogar: function(letraJogada){
            let acertou = false;
            for(let i =0; i<this.palavra.tamanho; i++){
                const letra = this.palavra.semAcentos[i].toLowerCase();
                if(letra === letraJogada.toLowerCase()){
                    acertou = true;
                    this.acertos = substituirCaractere(this.acertos, i, this.palavra.original[i]);
                }
            }

            if(!acertou){
                this.chances--;
            }
            return acertou;
        },
        ganhou: function(){
            return !this.acertos.includes(" ");
        },
        perdeu: function(){
            return this.chances <= 0;
        }, 
        acabou: function(){
            return this.ganhou() || this.perdeu();
        }, 
        emAndamento: false,
    }

    elementos.telaInicial.style.display = "flex";
    elementos.telaCadastro.style.display = "none";
    elementos.telaJogo.style.display = "none";
    elementos.telaMensagem.style.display = "none";
    elementos.telaMensagem.classList.remove("mensagem-vitoria");
    elementos.telaMensagem.classList.remove("mensagem-derrota");
    
    for(const parte of elementos.boneco){
        parte.classList.remove("escondido");
        parte.classList.add("escondido");
    }

    criarTeclado();

}

novoJogo();


function iniciarJogo(dificuldade){
    jogo.dificuldade = dificuldade;

    elementos.telaInicial.style.display = 'none';
    elementos.telaJogo.style.display = 'flex';

    jogo.emAndamento = true;

    sortearPalavra();
    mostrarPalavra();
}

elementos.botoes.facil.addEventListener("click", ()=> iniciarJogo("facil"));
elementos.botoes.medio.addEventListener("click", ()=> iniciarJogo("medio"));
elementos.botoes.dificil.addEventListener("click", ()=> iniciarJogo("dificil"));

function substituirCaractere(str, indice, novoCaractere){
    const parteAntes = str.substring(0, indice);
    const parteDepois = srt.substring(indice+1);
    const novaString = parteAntes + novoCaractere + parteDepois; 
    return novaString;
}