class ScoreBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    this.actor.textRenderer.setText(`score : ${Game.score}`);
    
  }
}
Sup.registerBehavior(ScoreBehavior);
