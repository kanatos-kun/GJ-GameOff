class PlayerLifeBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    this.actor.textRenderer.setText(`${Game.player["life"]}/${Game.player["maxLife"]}`);
  }
}
Sup.registerBehavior(PlayerLifeBehavior);
