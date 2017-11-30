namespace Game 
{
  export let  state : string = "title";
  export let score : number = 0;
  export let player : Object = { life    : 200,
                                 maxLife : 200};
  
  Sup.Input.setMouseVisible(false);

  
  export function changeState():void{
    switch(state)
    {
      case "title":
      Sup.loadScene("title/scene");
      break;
      case "game":
      score = 0;
      player["life"] = 200;
      player["maxLife"] = 200;
      Sup.loadScene("title/scene");
      Sup.loadScene("gamespace/scene");
      break;

      default:
      break;

    }
  }

}
