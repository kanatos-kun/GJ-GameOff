class DebugBehavior extends Sup.Behavior {
  debugLocalisation :boolean;
  debugCollideBox : boolean;
  debugSizeText : number;
  private debugActor : Sup.Actor;
  private debugText : Sup.TextRenderer;
  private debugTextList;
  
  awake() {
    let message:string = "Test d'affichage d'un texte deboguage";
    
    this.debugTextList = [
    (pX,pY):string=>{ return "position : [" + pX +";"+ pY +"]"},
    ];
    this.debugActor = new Sup.Actor("debugActor");
    this.debugActor.setPosition(this.actor.getPosition());
    this.debugText = new Sup.TextRenderer(this.debugActor,"","Font",{alignment:"left"});

    if(this.debugLocalisation == true){
      message +=  this.debugTextList[0](this.debugActor.getX(),this.debugActor.getY()) + "\n";
    }
    this.debugText.setText(message);
    this.debugText.setColor(1,1,1);
    this.debugText.setSize(this.debugSizeText==undefined?50:this.debugSizeText);
  }

  update() {
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
    }
    this.debugText.setText(message==undefined?"":message);
  }
}
Sup.registerBehavior(DebugBehavior);

