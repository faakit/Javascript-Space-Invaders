resources.load([
    "img/rock.png",
    'img/background.png',
    'img/invader3.png',
    'img/invader2.png',
    'img/invader1.png',
    'img/player.png'
]);

// Init se torna uma função e então só roda assim que carregadas as imagens do jogo
resources.onReady(init);

function init(){
    let engine = new Engine();
    engine.run();
}