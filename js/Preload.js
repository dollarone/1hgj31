var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.image('sky', 'assets/bg.png');
    this.game.load.image('ground', 'assets/bg_castle.png');
    this.game.load.image('hospital', 'assets/hospital6.png');
    this.game.load.spritesheet('dude', 'assets/doomfaces2.png', 52, 65);
    this.game.load.spritesheet('treat', 'assets/treat.png', 190, 45);
  },
  create: function() {
    this.state.start('Game');
  }
};
