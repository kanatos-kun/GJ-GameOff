class PlayerBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.isKeyDown("RIGHT")){
      this.actor.move(0.1,0);
    }
    if(Sup.Input.isKeyDown("LEFT")){
      this.actor.move(-0.1,0);
    }
    if(Sup.Input.isKeyDown("UP")){
      this.actor.move(0,0.1);
    }
    if(Sup.Input.isKeyDown("DOWN")){
      this.actor.move(0,-0.1);
    }
  }
}
Sup.registerBehavior(PlayerBehavior);
