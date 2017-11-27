class MouseBehavior extends Sup.Behavior {
  mouseRay = new Sup.Math.Ray();
  private mouseActor : Sup.Actor = new Sup.Actor("MouseActor");
  private mouseInputPosition : Sup.Math.Vector2;
  
  awake() {
    Sup.Input.setMouseVisible(false);
    new Sup.SpriteRenderer(this.mouseActor,"cursor");
    this.mouseActor.setZ(4);
  }

  update() {
    this.mouseInputPosition = Sup.Input.getMousePosition();
    this.mouseRay.setFromCamera(this.actor.camera,this.mouseInputPosition);
    this.mouseInputPosition.unproject(this.actor.camera);
    this.mouseActor.setPosition(this.mouseInputPosition);
    
    if(this.actor.getChild("GUI")!= undefined){
      let GUIComponent = this.actor.getChild("GUI");
      for(var i=0;i<GUIComponent.getChildren().length;i++){
        let GUIName = GUIComponent.getChildren()[i].getName();
        let GUI= GUIComponent.getChild(GUIName);
        if (GUIName.search(/window/)== 0){

          for(var j=0;j<GUI.getChildren().length;j++){
            let GUIButtonName = GUI.getChildren()[j].getName();
            let GUIButton = GUI.getChild(GUIButtonName);
            GUIButton.getBehavior(GUIBehavior).checkMouse(this.mouseActor);
          } 
        }
      }
    }

    
  } 
  
}
Sup.registerBehavior(MouseBehavior);

