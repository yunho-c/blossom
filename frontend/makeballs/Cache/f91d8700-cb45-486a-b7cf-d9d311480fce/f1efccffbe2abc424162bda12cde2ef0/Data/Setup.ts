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

    generate() {
        // let newball = this.ball.instantiate(this.getSceneObject()); // NOTE: I think `this.getSceneObject()` makes it replace the current object
        let newball = this.ball.instantiate(this.containerObj);
        newball.getTransform().setWorldPosition(this.getSceneObject().getTransform().getWorldPosition());
        print("gen triggered")
    }

    generateAll() {
        this.spawnPoints.forEach((value, ind) => {
            let spawnPoint = value
            this.spawnPointsT[ind] = spawnPoint.getTransform()
            this.generate()
        })
}

}

