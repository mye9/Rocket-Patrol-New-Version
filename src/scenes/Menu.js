class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.image('newplay', './assets/play.png');
    }
    
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(borderUISize, game.config.height/2 - borderUISize*2 - borderPadding, game.config.width-borderUISize*2, borderUISize * 2, 0xF3B141).setOrigin(0, 0);
        this.p1Play = new Newplay(this, game.config.width*0.3, game.config.height/2 + borderUISize*2 + borderPadding*1.5, 'newplay').setOrigin(0.5, 0);
        this.p1Play = new Newplay(this, game.config.width*0.3, game.config.height/2 + borderUISize + borderPadding*0.5, 'newplay').setOrigin(0.5, 0);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
 
        menuConfig.backgroundColor = '#000000';
        menuConfig.fontSize = '20px'
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height*0.875 - borderPadding*2, 'Hint:', menuConfig).setOrigin(0.5);   
        this.add.text(game.config.width/2, game.config.height*0.875, 'Use ←→ arrows to move & (F/G/H) to fire', menuConfig).setOrigin(0.5);   

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            spaceshipv2Speed: 6,
            mode: 0,
            gameTimer: 60000,  
            highScore: 0  
          }
          if (game.specialScore > game.settings.highScore){
            game.settings.highScore = game.specialScore; 
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            spaceshipv2Speed: 8,
            mode: 1,
            gameTimer: 45000,
            highScore: 0   
          }
          if (game.specialScore > game.settings.highScore){
            game.settings.highScore = game.specialScore; 
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}