// Variaveis do jogo
var canvas, ctx, Altura, Largura, frame = 0;
//objeto rec do jogo
var chao = {
        y: 450,
        altura: 150,
        cor: "#16a085",
        desenhar: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(0, this.y, Largura, this.altura);
        }
    },
    bloco = {
        x: 250,
        y: 0,
        altura: 40,
        largura: 40,
        cor: "#9b59b6",
        gravidade: 1.5,
        velocidade: 0,
        forcaDoPulo: 25,
        pula: function () {
            this.velocidade = -this.forcaDoPulo;
        },
        atualizar: function () {
            this.velocidade += this.gravidade;
            this.y += this.velocidade;
            //colisão com o chão
            if (this.y > chao.y - this.altura) {
                this.y = chao.y - this.altura;
            }
        },
        desenhar: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
        }
    };
//Conta a quantidade de clicks e faz o personagem pular
function clique(event) {
    bloco.pula();
}
//Funcao Principal
//Funcões e o construtor
function principal() {
    //pega a largura total da tela
    Largura = window.innerWidth;
    //pega a altura total da tela
    Altura = window.innerHeight;

    //se a largura for maior que 500px a largura é redefinida para 600px
    //obs essa condição sempre sera true para desktop, portanto a largura e altura sempre sera 600px
    if (Largura >= 500) {
        Largura = 600;
        Altura = 600;
    }
    //criacao do elemento do tipo canvas
    canvas = document.createElement("canvas");
    //define a largura do canvas
    canvas.width = Largura;
    //define a altura do canvas
    canvas.height = Altura;
    //pega o contexto 2d para o canvas
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    //adiciona o evento de clique, toda vez que alguem clica na pagina serpa executado a funcao "clique"
    document.addEventListener("mousedown", clique);
    //chama a funcao roda
    roda();
}

function roda() {
    //chama a funcao atualizar
    atualizar();
    //chama a funcao desenha
    desenhar();
    //a cada segundo a funcao roda sera chamada
    window.requestAnimationFrame(roda);
}

function atualizar() {
    //incrementa mais 1 ao nosso frame
    frame++;
    bloco.atualizar();
}

function desenhar() {
    //define a cor do retangulo que queremos desenhar
    ctx.fillStyle = "#50beff";
    //desenha um retangulo da x = 0 até o tamanho total da largura, e de y=0 até o tamanho total da altura
    ctx.fillRect(0, 0, Largura, Altura)
    chao.desenhar();
    bloco.desenhar();
}
//inicia o jogo
principal();
