class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('spaceshipv2', 'assets/newspaceshipv2.png');
        this.load.image('rocketv2', 'assets/newrocket.png');
        // load spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0); 

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p1Rocketv2 = new Rocketv2(this, game.config.width*0.75, game.config.height - borderUISize - borderPadding, 'rocketv2').setOrigin(0.5, 0);
        this.p1Rocketv3 = new Rocketv3(this, game.config.width*0.25, game.config.height - borderUISize - borderPadding, 'rocketv2').setOrigin(0.5, 0);


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceshipv2(this, game.config.width, borderUISize*7 + borderPadding*6, 'spaceshipv2', 0, 50).setOrigin(0,0);


        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.specialCollect = 0;
        this.highScore = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreMiddle = this.add.text(borderUISize*7, borderUISize + borderPadding*2, game.settings.highScore, scoreConfig);


        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        this.specialClock = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed = 20;
            this.ship02.moveSpeed = 20;
            this.ship03.moveSpeed = 20;
        }, null, this);

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        this.elapsed = this.clock.getElapsed();
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            if(this.p1Score > game.settings.highScore){
                game.settings.highScore = this.p1Score;
            }
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if(this.p1Score > game.settings.highScore){
                game.settings.highScore = this.p1Score;
                game.specialScore = this.p1Score;
            }
            this.scene.start("menuScene", game.settings.highScore);
        }



        this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p1Rocketv2.update();         // update rocket sprite
            this.p1Rocketv3.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.specialCollect = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.specialCollect = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.specialCollect = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.specialCollect = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocketv2, this.ship03)) {
            this.specialCollect = 1;
            this.p1Rocketv2.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocketv2, this.ship02)) {
            this.specialCollect = 1;
            this.p1Rocketv2.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocketv2, this.ship01)) {
            this.specialCollect = 1;
            this.p1Rocketv2.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocketv2, this.ship04)) {
            this.specialCollect = 1;
            this.p1Rocketv2.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocketv3, this.ship03)) {
            this.specialCollect = 1;
            this.p1Rocketv3.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocketv3, this.ship02)) {
            this.specialCollect = 1;
            this.p1Rocketv3.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocketv3, this.ship01)) {
            this.specialCollect = 1;
            this.p1Rocketv3.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocketv3, this.ship04)) {
            this.specialCollect = 1;
            this.p1Rocketv3.reset();
            this.shipExplode(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
        
        // score add and repaint
        this.p1Score += ship.points;
        if (this.specialCollect == 1){
            this.p1Score += ship.points;
        }
        this.scoreLeft.text = this.p1Score;   
        this.sound.play('sfx_explosion');    
    }
    
}