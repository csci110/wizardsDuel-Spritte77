import {game, Sprite} from "./sgc/sgc.js";
game.setBackground("floor.png");

class PlayerWizard extends Sprite { 
    Constructor() {
defineAnimation(Marcus, 0, 12);
this.definieAnimation("down", 6, 8);
this.speedWhenWalking = 100;
    }
    handleDownArrowKey() {
    this.playAnimation("down");
    this.speed = this.whenSpeedWalking;
    this.angle = 270;
}
}



let Marcus = new PlayerWizard ();
Marcus.name = "Marcus the Wizard";
Marcus.setImage("marcusSheet.png");
Marcus.width = 48;
Marcus.height = 48;
Marcus.x = this.width;
Marcus.y = this.y;

