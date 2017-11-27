namespace Game 
{
  export let  state : string = "game";
  Sup.Input.setMouseVisible(false);
  

  
  export function changeState():void{
    Sup.log(`changement de scene sur ${state}!`);
    switch(state)
    {
      case "title":
      Sup.loadScene("title scene");
      break;

      case "game":
      Sup.log(`changement de scene sur ${state}!`);
      Sup.loadScene("game scene");
      break;

      default:
      break;

    }
  }

}
