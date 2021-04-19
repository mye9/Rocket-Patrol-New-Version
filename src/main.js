let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let specialScore = 0;

// reserve keyboard vars
let keyF, keyR, keyG, keyD, keyLEFT, keyRIGHT;


//tile sprite 5pt
//high score 5pt
//'FIRE' UI text 5pt
//control rocket after fired 5pt
//background music 5pt
//title screen 10pt
//create new ship type 20pt
//create new artwork 20pt
//create new weapon 20pt


