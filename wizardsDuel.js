import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("floor.png");

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("right", 3, 5);
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.height;
        this.speedWhenWalking = 100;
        this.spellCastTime = 0;
        
    }
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    handleGameLoop() { //Keep marcus in display area
        this.y = Math.max(5, this.y);
        this.y = Math.min(game.displayHeight - this.height, this.y);
        this.speed = 0;
    }
    handleSpacebar() {
        let now = game.getTime(); 
        if (now - this.spellCastTime >= 2) {
            this.spellCastTime = now;
            let spell = new Spell();
            spell.name = "A spell cast by Marcus";
            spell.setImage("marcusSpellSheet.png");
            spell.x = this.x + this.width; //this sets the position of the spell object to equal to the right of wizard
            spell.y = this.y; //the position of any object in the player wizard class
            spell.angle = 0;
            this.playAnimation("right");
        }
    }
}
    let Marcus = new PlayerWizard();

class Spell extends Sprite {
    constructor(){
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleBoundaryContact() {
        //delete spell when it moves off screen
        game.removeSprite(this);
    }
    handleCollision(otherSprite) {
      if (this.getImage() !== otherSprite.getImage()) {
      // Adjust mostly blank spell image to vertical center.
      let verticalOffset = Math.abs(this.y - otherSprite.y);
      if (verticalOffset < this.height / 2) {
          game.removeSprite(this);
          new Fireball(otherSprite);
      }
  }
  return false;
}
}

class NonPlayerWizard extends Sprite {
    constructor(){
        super();
        this.name = "The mysterious stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("left", 10, 12);
    }
    handleGameLoop() {
        if (this.y <= 0) {
            //turn down
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down");
    }
        if (this.y >= game.displayHeight - this.height) {
            //turn up
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up");
    }
    if (Math.random() < 0.01) {
        let strangerspell = new Spell();
        //Create a spell object 48 pixels to the left of this object
        strangerspell.x = this.x - this.width;
        strangerspell.y = this.y; 
        // Make it go left, give it a name and an image
        strangerspell.angle = 180;
        strangerspell.name = "A scary spell";
        strangerspell.setImage("strangerSpellSheet.png");
        strangerspell.defineAnimation("scary", 0, 1);
        strangerspell.playAnimation("scary");
        //Play the left animation
        this.playAnimation("left");
    }
    }
    handleAnimationEnd() {
        if (this.angle == 90) {
            this.playAnimation("up");
        }
        if (this.angle == 270) {
            this.playAnimation("down");
        }
    }
}
let stranger = new NonPlayerWizard();

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = "A ball of fire";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 15);
        this.playAnimation("explode");
    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated the mysterious"
            + "\nstranger in the dark cloak!");
        }
        if (!game.isActiveSprite(Marcus)) {
            game.end("Marcus is defeated by the mysterious"
            + "\nstranger in the dark cloak!"
            + "\n\nBetter luck next time.");
        }
    }
}