class AsteroidBehavior extends Sup.Behavior {
  
  private rotation :Sup.Math.Vector3 = new Sup.Math.Vector3(0,0,0);
  life :number = 1;
  
  awake() {
    let spdRnd = Math.random()*1000;
    let x = (Math.random()*2-1)/spdRnd;
    let y = (Math.random()*2-1)/spdRnd;
    Sup.log(`spdRnd = ${spdRnd}`);
    Sup.log(`x = ${x}; y = ${y}`);
    this.actor.arcadeBody2D.setVelocity(x,y);
  }

  update() {
    let playerBody = Sup.getActor("player").arcadeBody2D;
    //Sup.log(Sup.getActor("player").getPosition());
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,playerBody);
    if(this.actor.arcadeBody2D.getTouches().top  ||
       this.actor.arcadeBody2D.getTouches().bottom ||
       this.actor.arcadeBody2D.getTouches().right  ||
       this.actor.arcadeBody2D.getTouches().left)
      {
        Sup.log("l'asteroid s'est recu un un joueur à la gueule!");
        let {x,y} = this.actor.arcadeBody2D.getVelocity();
      // playerBody.setVelocity(-x,-y);
      }
    
    if(this.life <=0)
      {
        this.actor.destroy();
      }
    
  }
}
Sup.registerBehavior(AsteroidBehavior);
