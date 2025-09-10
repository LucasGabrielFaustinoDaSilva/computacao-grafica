// Pegar o canvas
const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');

// Posição do fantasminha
let fantasma = {
    x: 200,
    y: 200,
    tamanho: 32,
    direcao: 'direita'
};

// Carregar as imagens do fantasminha
const imagens = {};
imagens.direita = new Image();
imagens.esquerda = new Image();
imagens.cima = new Image();
imagens.baixo = new Image();

// IMPORTANTE: Coloque os arquivos de imagem na mesma pasta!
imagens.direita.src = 'fantasma_direita.png';
imagens.esquerda.src = 'fantasma_esquerda.png';
imagens.cima.src = 'fantasma_cima.png';
imagens.baixo.src = 'fantasma_baixo.png';

// Função para desenhar o fantasminha
function desenhar() {
    // Limpar a tela (pintar de preto)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar o fantasminha na direção atual
    const imagemAtual = imagens[fantasma.direcao];
    if (imagemAtual.complete) {  // só desenha se a imagem carregou
        ctx.drawImage(
            imagemAtual, 
            fantasma.x - fantasma.tamanho/2, 
            fantasma.y - fantasma.tamanho/2, 
            fantasma.tamanho, 
            fantasma.tamanho
        );
    }
}

// Função para mover o fantasminha
function mover(novaDirecao) {
    const velocidade = 5;  // quantos pixels ele anda
    
    // Mudar a direção do fantasminha
    fantasma.direcao = novaDirecao;
    
    // Mover baseado na direção
    if (novaDirecao === 'direita') {
        fantasma.x += velocidade;
    } else if (novaDirecao === 'esquerda') {
        fantasma.x -= velocidade;
    } else if (novaDirecao === 'cima') {
        fantasma.y -= velocidade;
    } else if (novaDirecao === 'baixo') {
        fantasma.y += velocidade;
    }
    
    // Não deixar sair da tela
    if (fantasma.x < 0) fantasma.x = 0;
    if (fantasma.x > canvas.width) fantasma.x = canvas.width;
    if (fantasma.y < 0) fantasma.y = 0;
    if (fantasma.y > canvas.height) fantasma.y = canvas.height;
    
    // Redesenhar
    desenhar();
}

// Escutar as teclas do teclado
document.addEventListener('keydown', function(evento) {
    if (evento.key === 'ArrowRight') {
        mover('direita');
    } else if (evento.key === 'ArrowLeft') {
        mover('esquerda');
    } else if (evento.key === 'ArrowUp') {
        mover('cima');
    } else if (evento.key === 'ArrowDown') {
        mover('baixo');
    }
});

// Desenhar pela primeira vez quando a página carregar
window.addEventListener('load', function() {
    desenhar();
});