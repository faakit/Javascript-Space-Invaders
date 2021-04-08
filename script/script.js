resources.load([
    'img/firstScreen.png',
    "img/rock.png",
    'img/invader4.png',
    'img/invader3.png',
    'img/invader2.png',
    'img/invader1.png',
    'img/player.png'
]);

let f = new FontFace('Press Start', 'url(font/pressStart.ttf)');

// Carrega a fonte principal para carregar o jogo
f.load().then(function() {
    document.fonts.add(f);
});
resources.onReady(init);

function init() {
    let engine = new Engine();
    engine.run();
}