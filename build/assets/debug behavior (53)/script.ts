class DebugBehavior extends Sup.Behavior {
  debugLocalisation :boolean;
  debugCollideBox : boolean;
  debugSizeText : number;
  private debugActor : Sup.Actor;
  private debugText : Sup.TextRenderer;
  private debugTextList;
  private debugRectangleCollideBox : Sup.Actor;
  
  awake() {
    let message:string = "";
    
    this.debugTextList = [
    (pX,pY):string=>{ return "position : [" + pX +";"+ pY +"]"},
    ];
    this.debugActor = new Sup.Actor("debugActor");
    this.debugActor.setPosition(this.actor.getPosition());
    this.debugText = new Sup.TextRenderer(this.debugActor,"","Visitor",{alignment:"left"});
    this.debugText.setText(message);
    this.debugText.setColor(1,1,1);
    
    if(this.debugSizeText==undefined){
      this.debugSizeText = 50;
    }
    this.debugRectangleCollideBox = new Sup.Actor("debugCollideActor");
    this.debugRectangleCollideBox.setPosition(this.actor.getPosition());
  }

  update() {
    /*
    this.debugActor.setPosition(this.actor.getPosition());
    this.debugActor.setX(this.actor.getX() -0.6);
    this.debugActor.setY(this.actor.getY() +0.2);
    let message:string;
    if(this.debugLocalisation == true){
        if(message ==undefined){
          message = this.debugTextList[0](this.debugActor.getX().toFixed(2),this.debugActor.getY().toFixed(2)) + "\n";
        }else{
          message += this.debugTextList[0](this.debugActor.getX().toFixed(2),this.debugActor.getY().toFixed(2)) + "\n";
        }
      this.debugText.setText(message==undefined?"":message);
    }


    if(this.debugCollideBox == true){
      this.debugRectangleCollideBox.spriteRenderer = new Sup.SpriteRenderer(this.debugRectangleCollideBox,"rectangle");
      this.debugRectangleCollideBox.setZ(3.9);
    }
   */
  }
  
  showLocalisation(){
    this.debugActor.setPosition(this.actor.getPosition());
    this.debugActor.setX(this.actor.getX() -0.6);
    this.debugActor.setY(this.actor.getY() +0.2);
    this.debugText.setSize(this.debugSizeText);
    let message:string;
        if(message ==undefined){
          message = this.debugTextList[0](this.debugActor.getX().toFixed(2),this.debugActor.getY().toFixed(2)) + "\n";
        }else{
          message += this.debugTextList[0](this.debugActor.getX().toFixed(2),this.debugActor.getY().toFixed(2)) + "\n";
        }
      this.debugText.setText(message==undefined?"":message);
  }
  
  showCollideBox(pActor){
     // this.debugRectangleCollideBox.spriteRenderer = new Sup.SpriteRenderer(this.debugRectangleCollideBox,"rectangle");
     // this.debugRectangleCollideBox.setZ(3.9);
  }
}
Sup.registerBehavior(DebugBehavior);

