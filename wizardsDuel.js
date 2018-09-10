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
        let spell = new Spell();
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.x = this.width; //this sets the position of the spell object to equal to (also need to fix this)
        spell.y = this.y; //the position of any object in the player wizard class
        spell.angle = 0;
        this.playAnimation("right");
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
        game.removeSprite(this);
        new Fireball(otherSprite);
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
}