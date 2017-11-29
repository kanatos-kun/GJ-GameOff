namespace Game 
{
  export let  state : string = "game";
  export let score : number = 0;
  export let player : Object = { life    : 200,
                                 maxLife : 200};
  
  Sup.Input.setMouseVisible(false);

  
  export function changeState():void{
    Sup.log(`changement de scene sur ${state}!`);
    switch(state)
    {
      case "title":
      Sup.loadScene("title/scene");
      break;

      case "game":
      Sup.log(`changement de scene sur ${state}!`);
      Sup.loadScene("gamespace/scene");
      break;

      default:
      break;

    }
  }

}
