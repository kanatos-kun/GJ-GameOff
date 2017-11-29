class GameSpaceBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    let body = Sup.ArcadePhysics2D.getAllBodies()
    let x :number=     this.actor.getChild("player").getX();
    let y :number=     this.actor.getChild("player").getY();
    //Sup.getActor("camera").setPosition(this.actor.getX(),this.actor.getY());
    this.actor.setPosition(x,y);
   // this.actor.setPosition(x,y-1.25);
  }
}
Sup.registerBehavior(GameSpaceBehavior);
