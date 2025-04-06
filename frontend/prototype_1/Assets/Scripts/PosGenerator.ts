@component
export class IdeaGenerator extends BaseScriptComponent {
  @input
  public ballPrefab:ObjectPrefab
  // public evidencePrefab:ObjectPrefab
  // public hypothesisPrefab:ObjectPrefab

  onAwake() {
    this.init()
  }

  init() {
  }

  public spawnIdea(name: string, type: string) {
    let newball = this.ballPrefab.instantiate(this.getSceneObject());
    newball.getTransform().setWorldPosition(this.generateRandomPosition());
  }

  generateRandomPosition() {
    const X_RANGE = 100;
    const Y_RANGE = 100;
    const Z_RANGE = 100;
    let xPos = Math.random() * X_RANGE - (X_RANGE/2);
    let yPos = Math.random() * Y_RANGE - (Y_RANGE/2);
    let zPos = Math.random() * Z_RANGE - (Z_RANGE/2);

    return new vec3(xPos, yPos, zPos);
  }
}


