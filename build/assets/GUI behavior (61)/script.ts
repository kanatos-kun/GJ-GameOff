class GUIBehavior extends Sup.Behavior {
  state : string;
  awake() {

  }

  update() {

  }
  
  checkMouse(pMouseActor : Sup.Actor){
          if(util.checkGUICollision(this.actor,pMouseActor)==true)
             {
             this.actor.getChild("hover").setVisible(true);
             this.actor.getChild("inactif").setVisible(false);
              if(Sup.Input.isMouseButtonDown(0)){
                this.actor.getChild("hover").setVisible(false);
                this.actor.getChild("actif").setVisible(true);
              }
              if(Sup.Input.wasMouseButtonJustReleased(0)==true){
                  if(this.state != undefined){
                    Sup.Audio.playSound("title/button",0.5);
                    Game.state = this.state;
                    Game.changeState();                    
                  }
                }
          }else{
            this.actor.getChild("hover").setVisible(false);
            this.actor.getChild("inactif").setVisible(true);
          }

  }
  
}
Sup.registerBehavior(GUIBehavior);
