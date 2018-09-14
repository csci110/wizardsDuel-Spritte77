import {game, Sprite} from "./sgc/sgc.js";
game.setBackground("spiderbackground.png");


let topWall = new Sprite ();
topWall.width = 800;
topWall.height = 48;
topWall.setImage("weirdspiderwallhorizontal.png");
topWall.x = 0;
topWall.y = 0;
topWall.accelerateOnBounce = false;

let leftWall = new Sprite ();
leftWall.width = 48;
leftWall.height = 504;
leftWall.setImage("weirdspiderwallvertical.png");
leftWall.x = 0;
leftWall.y = topWall.height;
leftWall.accelerateOnBounce = false;

let rightWall = new Sprite ();
rightWall.width = 48;
rightWall.height = 504;
rightWall.setImage("weirdspiderwallvertical.png");
rightWall.x = (topWall.width - leftWall.width);
rightWall.y = topWall.height;
rightWall.accelerateOnBounce = false;

let bottomWall = new Sprite ();
bottomWall.width = 800;
bottomWall.height = 48;
bottomWall.setImage("weirdspiderwallhorizontal.png");
bottomWall.x = 0;
bottomWall.y = (leftWall.height + leftWall.width);
bottomWall.accelerateOnBounce = false;//These walls are so IntruderSpider doesnt go off the screen

class PlayerSpider extends  Sprite() {
    constructor() {
        super();
        this.name = "Spudz";
        this.setImage = "Spider1.png";
        this.width = 40;
        this.height = 40;
        this.x = 60;
        this.y = 60;
        this.speedWhenWalking = 300;
        this.webShooterTime = 0;
    }
    handleDownArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    handleUpArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    handleRightArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 0;
    }
    handleLeftArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }
    handleGameLoop() { //keep Spudz in area
        this.y = Math.max(5, this.y);
        this.y = Math.min(game.displayHeight - this.height, this.y);
        this.speed = 0;
    }
    handleSpacebar() {
        let now = game.getTime(); 
        if (now - this.webShooterTime >= 2) {
            this.webShooterTime = now;
            let web = new Web();
            web.name = "A spiders web";
            web.setImage("webslinging.png");
            web.x = this.x;
            web.y = this.y;
            web.angle = 270;
        }
    }
}

    let Spudz = new PlayerSpider();

class Web extends Sprite() {
    constructor(){
        super();
        this.speed = 200;
        this.height = 40;
        this.width = 40;
    }
    handleBoundaryContact() {
        //delete web when it moves off screen
        game.removeSprite(this);
    }
    handleCollision(otherSprite) {
        if (this.getImage() !== otherSprite.getImage()) {
      // Adjust mostly blank web image to vertical center.
      let verticalOffset = Math.abs(this.y - otherSprite.y);
      if (verticalOffset < this.height / 2) {
          game.removeSprite(this);
          new deadWeb(otherSprite);
      }
      
    }
    return false;
}
}

class NonPlayerSpider extends Sprite() {
    constructor() {
        super();
        this.name = "Intruder Spider";
        this.setImage = "Spider21.png";
        this.width = 43;
        this.height = 37;
        this.x = game.displayWidth - 2 * 60;
        this.y = 60;
        this.angle = Math.random() * (360-0);
        this.speed = 300;
    }
    handleGameLoop() {
     if (Math.random() < 0.1) {
        let intruderweb = new Web();
        intruderweb.x = this.x;
        intruderweb.y = this.y;
        intruderweb.angle = 270;
        intruderweb.name = "A yucky web";
        intruderweb.setImage("webslinging.png");
     }
}
}

    let IntruderSpider = new NonPlayerSpider();

class deadWeb extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("webslinging.png");
        this.name = "A spiders web";
        game.removeSprite(deadSprite);
    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(IntruderSpider)) {
            game.end("Congratulations!\n\nYou have defended your"
            + "\nweb!");
        }
        if (!game.isActiveSprite(Spudz)) {
            game.end("Your web has been taken"
            + "\nover!"
            + "\n\nGood luck with your next web.");
        }
    }
}

//I can't get my sprites to show up I have tried Ctrl shift j and it doesn't
//make sense to me I try to fix the issue it states then another issue pops 
//up with the constructor not allowing it.