// Rocket prefab
class Rocketv2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);

      scene.add.existing(this);   // add to existing, displayList, updateList
      this.isFiring = false;      // track rocket's firing status
      this.moveSpeed = 0.8;         // pixels per frame
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    update() {
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyG) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
            this.x -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        this.x = game.config.width*0.75;
    }
}