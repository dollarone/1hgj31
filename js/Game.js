var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
  create: function() {

    this.player;
    this.platforms;
    this.cursors;

    this.stars;
    this.score = 0;
    this.scoreText;

    //  A simple background for our game
    this.sky = this.game.add.sprite(0, -10, 'sky');
    this.sky.scale.setTo(4,2);

    this.ground = this.game.add.sprite(0, 500, 'ground');
    this.ground.scale.setTo(4,0.5);

    this.game.add.sprite(40, 40, 'hospital');

    // The player and its settings
    this.playerGroup = this.game.add.group();
    this.player = this.playerGroup.create(247, 184, 'dude');

    this.player.scale.setTo(0.8,0.8);
    this.player.inputEnabled = true;
    this.text = this.game.add.text(0, 0, "", { fontSize: '32px', fill: '#000' });
    this.text.anchor.set(0.5);
    this.text.alpha = 0;
    this.text.x = 660;
    this.text.y = 200;
    //this.player.input.useHandCursor = true; //if you want a hand cursor
    //this.player.events.onInputOver.add(this.hoverIn, this);
    //this.player.events.onInputOut.add(this.hoverOut, this);
    this.player.frame = 4;
    this.player2 = this.playerGroup.create(315, 184, 'dude');
    this.player2.scale.setTo(0.8,0.8);
    this.player2.inputEnabled = true;
    this.player2.frame = 27;

    this.timer = 0;
    this.addPatient(249, 245, "Mr Inaco.\nMinor migraine.", 99, 5, 0, 120);
    this.addPatient(449, 243, "Mr LiamLime.\nBleeding ears.", 32, 6, 16, 220);
    this.addPatient(449, 366, "Mr Bitslap.\nEye infection.", 70, 4, 8, 270);
    this.addPatient(253, 366, "Mr Dollarone.\nZombie bite.", 15, 0, 24, 450);
    this.addPatient(383, 306, "Agent Smith.\nBurnt face.", 66, 3, 8, 370);
    
    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  The score
    this.titleText = this.game.add.text(16, 16, 'The Waiting Room', { fontSize: '32px', fill: '#000' });
    this.scoreText = this.game.add.text(650, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.score = 0;


    this.player["text"] = "Mr Jones.\nMinor head injury.";
    this.player2["text"] = "Mr Anderson.\nOpen head wound.";
    this.player["waitingForTreatment"] = true;
    this.player2["waitingForTreatment"] = true;
    this.player["health"] = 90;
    this.player2["health"] = 20;
    this.player["face"] = 1;
    this.player2["face"] = 2;
    this.player.frame =  this.player["face"] + 8;
    this.player2.frame =  this.player2["face"] + 24;

    this.player["time"] = 200;
    this.player2["time"] = 400;

    this.player.events.onInputDown.add(this.updateText, this);
    this.player2.events.onInputDown.add(this.updateText, this);

//    this.button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', actionOnClick, this, 'over', 'out', 'down');

    this.treating = false;
    this.treatingTime = 400;

    this.button = this.game.add.sprite(550, 300, 'treat');
    this.button.inputEnabled = true;
    this.button.events.onInputDown.add(this.actionOnClick, this);
    this.noone = {};
    this.button.frame = 1;
    this.selected = this.noone;
  },

  addPatient: function(x, y, text, health, face, offset, time) {
    var player = this.playerGroup.create(x, y, 'dude');

    player.scale.setTo(0.8,0.8);
    player.inputEnabled = true;
    player["text"] = text;
    player["waitingForTreatment"] = true;
    player["health"] = health;
    player["face"] = face;
    player.frame = player["face"] + offset;
    player["time"] = time;
    player.events.onInputDown.add(this.updateText, this);
  },

  actionOnClick: function (sprite, pointer) {
    if (this.selected["health"] != 0 && this.selected["waitingForTreatment"]) {
        this.treating = true;
        this.button.frame = 1;

    }
    //this.button.frame = 1;

  },


  updateText: function (sprite, pointer) {

    this.treating = false;
  

    this.text.alpha = 1;
    if (!sprite["waitingForTreatment"]) {
        this.text.text = sprite["text"] + "\nThe patient was\nsuccessfully treated";
    }
    else if (sprite["health"] == 0) {
        this.text.text = sprite["text"] + "\nThe patient died in \nthe waiting room!";
    }
    else {
        this.text.text = sprite["text"] + "\nTreatment time: " + sprite["time"] + "\nHealth: " + sprite["health"];
    }
    this.selected = sprite;
    this.button.frame = 0;

  },

  update: function() {
    this.timer++;
    if (this.timer % 100 == 0) {
        this.playerGroup.forEach(function(currentPlayer) {
            if (currentPlayer["waitingForTreatment"] && currentPlayer["health"] != 0) {
                currentPlayer["health"]--;
                if (currentPlayer["health"] == 0) {
                    currentPlayer.frame = 40;     
                    this.treating = false;
                }
                else {
                    if (currentPlayer["health"] < 10) {
                        currentPlayer.frame = currentPlayer["face"] + 32;
                    }
                    else if (currentPlayer["health"] < 30) {
                        currentPlayer.frame = currentPlayer["face"] + 24;
                    }
                    else if (currentPlayer["health"] < 60) {
                        currentPlayer.frame = currentPlayer["face"] + 16;
                    }
                    else if (currentPlayer["health"] < 80) {
                        currentPlayer.frame = currentPlayer["face"] + 8;
                    }
                }
            }
            if (this.selected == currentPlayer) {
                if (!currentPlayer["waitingForTreatment"]) {
                    this.text.text = currentPlayer["text"] + "\nThe patient was\nsuccessfully treated";
                }
                else if(currentPlayer["health"] == 0) {
                    this.text.text = currentPlayer["text"] + "\nThe patient died in \nthe waiting room!";
                }
                else {
                    this.text.text = currentPlayer["text"] + "\nTreatment time: " + currentPlayer["time"] + "\nHealth: " + currentPlayer["health"];
                }
            }
        }, this)
    }

    if (this.treating) { // this.timer % 10 == 0 && 
        this.selected["time"]--;

        if (this.selected["time"] <= 0) {
            this.selected["waitingForTreatment"] = false;
            this.selected["health"] = 100;
            this.selected.frame = this.selected["face"];
            this.score += 1;
            this.scoreText.text = "Score: " + this.score;
            this.treating = false;
        }
        else {
            this.text.text = this.selected["text"] + "\nTreatment time: " + this.selected["time"] + "\nHealth: " + this.selected["health"];
        }
    }
    if (this.score == 7) {
        this.titleText.text = "The Waiting Room\n\n\nAll patients saved!\n\nGood work!";
    }
    
  },

};