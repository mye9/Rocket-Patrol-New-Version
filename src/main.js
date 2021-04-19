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


//Minghui Ye, Rocket Patrol Mods New Version, 2021/4/19, 13hrs

//points breakdown:
//I add a tile sprite like a planet between the spaceships and the rockets, which is worth 5pts.
//I add the high score in the right of the current score textbox(the middle one). It can keep tracking the high score even if you exit to the main screen and start again. It worths 5 pts.
//I add a 'FIRE' UI text, and it appears on the rightest textbox when it is firing, which it worths 5pts.
//I add a background music when player start the playscreen. Although it is downloading from royalty free music, it is a copy-free music. It worths 5 pts.
//I add the feature that player can control the main rocket (I create two more weapons, but they cannot be controlled by features) after fired, which it worth 5 pts.
//I remake the title screen for the game. I did not make so much changes, because I still hope the title screen to match with the game screen. It worths 10 pts.
//I create a new ship type, which is under the classic 3 ships. It scores 50 pts, but it is more faster and hard to be shot. It worths 20 pts.
//I create a new artwork for both spaceships, rockets and explosion effects, which is worth 20pts
//I make a new weapon, which I placed them in the two sides of the classic rockets. The new rockets move much slower than the classic rockets, and they cannot be controlled by player when they are fired, but they can double the points when shooting down the spaceship. It worths 20 pts.
//I make totally 105pts for this project.


