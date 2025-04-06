@component
export class Setup extends BaseScriptComponent {
    @input
    public ballPrefab:ObjectPrefab

    public X_RANGE = 50
    public Y_RANGE = 20
    public Z_RANGE = 100
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
        print("spawnBalls() triggered")
        // this.spawnPoints.forEach((value, ind) => {
        //     let spawnPoint = value
        //     this.spawnPointsT[ind] = spawnPoint.getTransform()
        //     this.generate()
        // })
        this.generate()
    }

    generate() {
        print("generate() triggered")
        let newball = this.ballPrefab.instantiate(this.getSceneObject());
        let xPos = Math.random() * this.X_RANGE - (this.X_RANGE/2)
        let yPos = Math.random() * this.Y_RANGE - (this.Y_RANGE/2)
        let zPos = Math.random() * this.Z_RANGE - (this.Z_RANGE/2)
        newball.getTransform().setWorldPosition(new vec3(xPos, yPos, zPos));
    }
}

