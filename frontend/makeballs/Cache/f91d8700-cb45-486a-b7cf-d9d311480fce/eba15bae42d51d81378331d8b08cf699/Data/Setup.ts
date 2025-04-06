@component
export class Setup extends BaseScriptComponent {

  onAwake() {
    this.init()
    // this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this))
  }

  init () {
    // this.toolSpawnPointsT = []
    // this.latestObj = []
    // this.latestObjT = []
    // this.spanwAllTools()
    this.spawnBalls()
  }

  spawnBalls() {
    
  }

}
