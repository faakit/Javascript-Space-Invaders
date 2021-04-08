resources.load([
    'img/firstScreen.png',
    "img/rock.png",
    'img/invader4.png',
    'img/invader3.png',
    'img/invader2.png',
    'img/invader1.png',
    'img/player.png'
]);

// Previne que o espaço faça com que a tela abaixe
window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
});

// Carrega a fonte principal para carregar o jogo
let f = new FontFace('Press Start', 'url(font/pressStart.ttf)');
f.load().then(function() {
    document.fonts.add(f);
});

// Checa se as imagens foram carregadas e inicia o jogo
resources.onReady(init);



function init() {
    let engine = new Engine();
    engine.run();
}