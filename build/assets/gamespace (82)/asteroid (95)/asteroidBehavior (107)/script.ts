class AsteroidBehavior extends Sup.Behavior {
  
  private rotation :Sup.Math.Vector3 = new Sup.Math.Vector3(0,0,0);
  private limitBodies : Sup.ArcadePhysics2D.Body[] =[];
  life :number = 1;
  attack : number = 10;
  sleep : boolean = true;
  awake() {
    let spdRnd = Math.random()*1000;
    let x = (Math.random()*2-1)/spdRnd;
    let y = (Math.random()*2-1)/spdRnd;
    let limitActors = Sup.getActor("limit").getChildren();
    for(let limitActor of limitActors) this.limitBodies.push(limitActor.arcadeBody2D);
    this.actor.arcadeBody2D.setVelocity(x,y);
   if(this.sleep) this.actor.arcadeBody2D.setVelocity(0,0);
  }

  update() {
    
    
   for(let limitBodie of this.limitBodies) Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,limitBodie);

    if(Sup.getActor("player")!= undefined){
      let playerBody = Sup.getActor("player").arcadeBody2D;
      //Sup.log(Sup.getActor("player").getPosition());
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,playerBody);
     
      /*
      if(this.actor.arcadeBody2D.getTouches().top  ||
         this.actor.arcadeBody2D.getTouches().bottom ||
         this.actor.arcadeBody2D.getTouches().right  ||
         this.actor.arcadeBody2D.getTouches().left)
        {
          let {x,y} = this.actor.arcadeBody2D.getVelocity();
        // playerBody.setVelocity(-x,-y);
        } 
    */
    }

    
    if(this.life <=0)
      {
        this.actor.destroy();
      }
    
  }
}
Sup.registerBehavior(AsteroidBehavior);
