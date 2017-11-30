class GameSpaceBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    let body = Sup.ArcadePhysics2D.getAllBodies();
    
    if(this.actor.getChild("player") != undefined)
      {
        let x :number=     this.actor.getChild("player").getX();
        let y :number=     this.actor.getChild("player").getY();
        //Sup.getActor("camera").setPosition(this.actor.getX(),this.actor.getY());
        this.actor.setPosition(x,y);
      }

    let asteroids = Sup.getActor("asteroids").getChildren();
    
    Sup.getActor("HUD").getChild("asteroidHUD").textRenderer.setText(`asteroid : ${asteroids.length}`);
    /*
    asteroidSpawner();
    function asteroidSpawner(){
      
      let asteroids = Sup.getActor("asteroids").getChildren();
      if(asteroids.length <=6)
      {
        let asset = Sup.getActor("asteroids").getChild("asset").getChildren();
        while (asteroids.length<=11) {
           let rnd = Math.floor( (Math.random()*asset.length) );
           let chooseAsteroid = asset[rnd];
           let x = 59.6 + Math.random() * 48;
           let y = - 1.81 + Math.random() * -19 ;
           while(x<59 && x>108 && y>-2 && y<-21)
             {
               x = 59.6 + Math.random() * 48;
               y = - 1.81 + Math.random() * -19 ;
             }
                         Sup.log(`x : ${x}; y : ${y}`);
                    Sup.log(asteroids.length);

         let newAsteroid = new Sup.Actor(chooseAsteroid.getName(),Sup.getActor("asteroids"));
          newAsteroid.getBehavior(AsteroidBehavior).actor.arcadeBody2D = chooseAsteroid.getBehavior(AsteroidBehavior).actor.arcadeBody2D;
          newAsteroid.addBehavior(AsteroidBehavior);
          newAsteroid.getBehavior(AsteroidBehavior).sleep = false;
          newAsteroid.getBehavior(AsteroidBehavior).life = chooseAsteroid.getBehavior(AsteroidBehavior).life;
          newAsteroid.getBehavior(AsteroidBehavior).attack = chooseAsteroid.getBehavior(AsteroidBehavior).attack;

        }
      }
      
    }*/
    
    
   // this.actor.setPosition(x,y-1.25);
  }
}
Sup.registerBehavior(GameSpaceBehavior);
