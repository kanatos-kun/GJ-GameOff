class PlayerBehavior extends Sup.Behavior {
  speed:number = 250;
  fireSpeedWeapon:number = 800;
  shootTime : number = 50;
  private _shootTime : number = this.shootTime;
  private shootStart : boolean = false;
  private shootReturn : boolean = false;
  private maxSpeed:number = this.speed;
  private rotation : Sup.Math.Vector3;
  private move : Sup.Math.Vector3;
  private vecSpeed : Sup.Math.Vector2;
  private vecFireSpeedWeapon : Sup.Math.Vector2;
  private desceleration : boolean = false;
  //private enemisBodies : Sup.ArcadePhysics2D.Body[] =[];
  private asteroidBodies : Sup.ArcadePhysics2D.Body[] =[];
  private mousePosition : Sup.Math.Vector2;
  private distance : number = 0;
  private startDistShip : Sup.Math.Vector3;
  private movingShip : boolean = false;
  
  mouse : Sup.Actor;
  
  awake() {
    //let enemisActors = Sup.getActor("enemi").getChildren();
    //for(let enemiActor of enemisActors) this.enemisBodies.push(enemiActor.arcadeBody2D);
    let asteroidActors = Sup.getActor("asteroids").getChildren();
    for(let asteroidActor of asteroidActors) this.asteroidBodies.push(asteroidActor.arcadeBody2D);
    this.rotation = new Sup.Math.Vector3(0,0,0);
    this.vecSpeed = new Sup.Math.Vector2(0,0);
    this.vecFireSpeedWeapon = new Sup.Math.Vector2(0,0);
    let cos = Math.cos(this.rotation.z);
    let sin = Math.sin(this.rotation.z);
    this.move = new Sup.Math.Vector3(sin,cos,0);
    this.mouse = Sup.getActor("camera");
  }

  update() {

    /* 
    for(let enemiBodie of this.enemisBodies)
    {
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,enemiBodie);
      if(this.actor.arcadeBody2D.getTouches().top    ||
         this.actor.arcadeBody2D.getTouches().bottom ||
         this.actor.arcadeBody2D.getTouches().right  ||
         this.actor.arcadeBody2D.getTouches().left)
      {
        Sup.log("collision avec un enemi!");
      }
    }
    */
    
    for(let asteroidBodie of this.asteroidBodies)
    {
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,asteroidBodie);
      Sup.log(this.asteroidBodies.indexOf(asteroidBodie));
      if(this.actor.arcadeBody2D.getTouches().top    ||
         this.actor.arcadeBody2D.getTouches().bottom ||
         this.actor.arcadeBody2D.getTouches().right  ||
         this.actor.arcadeBody2D.getTouches().left)
      {
        Game.player["life"] -=10;
      }
      let shoot = this.actor.getChild("shoot");
      Sup.ArcadePhysics2D.collides(shoot.arcadeBody2D,asteroidBodie);
      if(shoot.arcadeBody2D.getTouches().top    ||
         shoot.arcadeBody2D.getTouches().bottom ||
         shoot.arcadeBody2D.getTouches().right  ||
         shoot.arcadeBody2D.getTouches().left)
      {
        this._shootTime = 0;
        Game.score += 100;
        asteroidBodie.actor.getBehavior(AsteroidBehavior).life -=1;
        if(asteroidBodie.actor.getBehavior(AsteroidBehavior).life<=0)
          {
            let index = this.asteroidBodies.indexOf(asteroidBodie);
            this.asteroidBodies.splice(index,1);
          }
      }
    }
    
    if(!this.shootReturn && !this.shootStart)
    { 
     
       let mousePosition = Sup.Input.getMousePosition();

        this.rotation.z=Math.atan2(-mousePosition.x,mousePosition.y);
        this.actor.setEulerAngles(this.rotation);  
          if(Sup.Input.wasMouseButtonJustPressed(0))
          {

            this.move.x = Math.cos(this.rotation.z);
            this.move.y = Math.sin(this.rotation.z);
            this.mousePosition = this.mouse.getBehavior(MouseBehavior).getPosition();
            this.distance = this.actor.getPosition().toVector2().distanceTo(this.mousePosition);
            this.startDistShip = this.actor.getPosition();
            //Sup.log(this.actor.getPosition().toVector2().distanceTo(this.mousePosition));
            this.vecSpeed.x = this.move.x*this.maxSpeed/10000;
            this.vecSpeed.y = this.move.y*this.maxSpeed/10000;
            this.actor.arcadeBody2D.setVelocity(-this.vecSpeed.y,this.vecSpeed.x);
            this.movingShip = true;
            //Sup.log(mousePosition);
          }

          if(this.movingShip)
          {
            //this.distance = this.actor.getPosition().toVector2().distanceTo(this.mousePosition);

            let distanceA = new Sup.Math.Vector2(this.vecSpeed.x,this.vecSpeed.y);
            let posActor = this.actor.getPosition().toVector2();
            let distancePas = posActor.distanceTo(distanceA.add(posActor));
            let distanceB = this.actor.getPosition().toVector2().distanceTo(this.startDistShip);

            if(distanceB>=this.distance)
            {
              this.speed = this.maxSpeed;
              this.movingShip = false;
              this.desceleration = true;
            }
            else
            {
            //this.actor.move(-this.move.y*this.speed/10000,this.move.x*this.speed/10000,0)
            //this.actor.arcadeBody2D.setVelocity(-this.vecSpeed.y,this.vecSpeed.x);
            }
          }


          if(!this.movingShip)
          {
            if(Sup.Input.wasMouseButtonJustPressed(2))
            {
              this.move.x = Math.cos(this.rotation.z);
              this.move.y = Math.sin(this.rotation.z);
              this.vecFireSpeedWeapon.x = this.move.x*this.fireSpeedWeapon/10000;
              this.vecFireSpeedWeapon.y = this.move.y*this.fireSpeedWeapon/10000;
              let shoot = this.actor.getChild("shoot");
              shoot.setVisible(true);
              shoot.arcadeBody2D.warpPosition(this.actor.getX(),this.actor.getY());
              shoot.arcadeBody2D.setVelocity(-this.vecFireSpeedWeapon.y,this.vecFireSpeedWeapon.x);
              this.shootStart = true;
            }
          }

      
      
    }
    

    if(this.shootStart)
    {
      this._shootTime--;
      if(this._shootTime<=0)
        {
          this._shootTime = this.shootTime;
          this.shootStart = false;
          this.shootReturn = true;
        }
    }

    if(this.shootReturn)
    {
      this.vecFireSpeedWeapon.x = this.move.x*this.fireSpeedWeapon/10000;
      this.vecFireSpeedWeapon.y = this.move.y*this.fireSpeedWeapon/10000;
      let shoot = this.actor.getChild("shoot");
      shoot.arcadeBody2D.setVelocity(this.vecFireSpeedWeapon.y,-this.vecFireSpeedWeapon.x);
      Sup.ArcadePhysics2D.collides(shoot.arcadeBody2D,this.actor.arcadeBody2D);
      if(shoot.arcadeBody2D.getTouches().top ||
         shoot.arcadeBody2D.getTouches().bottom ||
         shoot.arcadeBody2D.getTouches().right ||
         shoot.arcadeBody2D.getTouches().left
        )
        {
          this.shootReturn = false;
          shoot.setVisible(false);
        }
    }
    /* 
   // Sup.getActor("camera").setPosition(this.actor.getX(),this.actor.getY());
    if(Sup.Input.isKeyDown("RIGHT")){
      this.rotation.z -= 0.1;
      this.actor.setEulerAngles(this.rotation)
      this.move.x = Math.cos(this.rotation.z)
      this.move.y = Math.sin(this.rotation.z)
    }
    if(Sup.Input.isKeyDown("LEFT")){
      this.rotation.z += 0.1;
      this.actor.setEulerAngles(this.rotation)
      this.move.x = Math.cos(this.rotation.z)
      this.move.y = Math.sin(this.rotation.z)
    }
    
    if(Sup.Input.isKeyDown("UP")){
      this.desceleration = false;
      this.vecSpeed.x = this.move.x*this.maxSpeed/10000
      this.vecSpeed.y = this.move.y*this.maxSpeed/10000
      this.actor.move(-this.move.y*this.speed/10000,this.move.x*this.speed/10000,0)
      this.actor.arcadeBody2D.setVelocity(-this.vecSpeed.y,this.vecSpeed.x);
    }
    */
    /*
    if(Sup.Input.isKeyDown("DOWN")){
      // this.actor.move(this.move.y*this.speed/10000,-this.move.x*this.speed/10000,0)
       this.actor.arcadeBody2D.setVelocity(this.vecSpeed.x,-this.vecSpeed.y);
    }*/
    
    if(Sup.Input.wasKeyJustReleased("UP")){
      //this.actor.arcadeBody2D.setVelocity(new Sup.Math.Vector2(0,0));
      // this.actor.arcadeBody2D.setVelocity(-this.vecSpeed.x,this.vecSpeed.y)
     // this.desceleration = true;
     // this.speed = this.maxSpeed;
    }
    
    if(this.desceleration==true){
      this.speed -= 5;
      this.vecSpeed.x = this.move.x*this.speed/10000
      this.vecSpeed.y = this.move.y*this.speed/10000
      this.actor.arcadeBody2D.setVelocity(-this.vecSpeed.y,this.vecSpeed.x);
      if(this.speed <=0){
      this.actor.arcadeBody2D.setVelocity(0,0);
      this.desceleration = false;
      }
    }
    
    this.updateDebug();
  }
  
  updateDebug(){

     if(this.actor.getBehavior(DebugBehavior) != undefined){
        if(this.actor.getBehavior(DebugBehavior).debugLocalisation==true){
          this.actor.getBehavior(DebugBehavior).showLocalisation();
        }
         if(this.actor.getBehavior(DebugBehavior).debugCollideBox==true){
          this.actor.getBehavior(DebugBehavior).showCollideBox(this.actor);
        }
     }
    
  }
  

  
  
  
  
  
  
  
}
Sup.registerBehavior(PlayerBehavior);
