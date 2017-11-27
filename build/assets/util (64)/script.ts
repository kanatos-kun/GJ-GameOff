namespace util
{
  export function checkGUICollision(actorGUI:Sup.Actor,actorMouse:Sup.Actor):boolean{ 
  let scaleX = actorGUI.getLocalScaleX();
  let scaleY = actorGUI.getLocalScaleY();
  let {width,height} = actorGUI.getChild("inactif").spriteRenderer.getSprite().getGridSize();
  let dimension = {width : width * scaleX, height : height * scaleY};
  let GUIposition = actorGUI.getChild("inactif").getPosition();
    
    if((actorMouse.getX()> GUIposition.x &&
        actorMouse.getX()< GUIposition.x + dimension.width/100  &&
        actorMouse.getY()< GUIposition.y-0.15  &&
        actorMouse.getY()> GUIposition.y - dimension.height/100-0.03)){
      return true
    }
    return false
   }
}
