@component
export class Setup extends BaseScriptComponent {

    @input
    public ballPrefab:ObjectPrefab

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
        // this.spawnPoints.forEach((value, ind) => {
        //     let spawnPoint = value
        //     this.spawnPointsT[ind] = spawnPoint.getTransform()
        //     this.generate()
        // })
    }

    generate() {
      print("generate() triggered")
        let newball = this.ballPrefab.instantiate(this.getSceneObject());
        // newball.getTransform().setWorldPosition(this.getSceneObject().getTransform().getWorldPosition());
    }
}

