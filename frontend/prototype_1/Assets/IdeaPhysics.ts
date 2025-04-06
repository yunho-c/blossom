@component
export class NewScript extends BaseScriptComponent {

  // public balls: SceneObject;
    @input
    private stormObject: SceneObject;

    private subSceneObjects: SceneObject[] = [];

    @input
    public ballPrefab: ObjectPrefab;

    private init() {
        const rootObject = this.getSceneObject();
        if (rootObject) {
            for (let item of this.items) {
                let object = this.spawnIdea(item, "evidence");
                this.subSceneObjects.push(object);
            }
        }
    }

    onAwake() {
        this.init();
        this.createEvent("UpdateEvent").bind(this.update.bind(this));
    }

    public spawnIdea(name: string, type: string) {
      let newball = this.ballPrefab.instantiate(this.getSceneObject());
      newball.getTransform().setWorldPosition(this.generateRandomPosition());
      // newball.
      return newball
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

    private items: string[] = [
        "apple",
        "fuji",
        "orange",
        "mandarin",
        "banana",
        "plantain"
    ];

    private weights: number[][] = [
    [
      1.000000238418579,
      0.4140651822090149,
      0.6592483520507812,
      0.5094653367996216,
      0.6171855330467224,
      0.49724820256233215
    ],
    [
      0.4140651822090149,
      0.9999998807907104,
      0.3806169033050537,
      0.44238805770874023,
      0.38415607810020447,
      0.44372376799583435
    ],
    [
      0.6592483520507812,
      0.3806169033050537,
      0.9999997615814209,
      0.6223424673080444,
      0.5614188313484192,
      0.5190407037734985
    ],
    [
      0.5094653367996216,
      0.44238805770874023,
      0.6223424673080444,
      1.0000001192092896,
      0.5174458622932434,
      0.6165656447410583
    ],
    [
      0.6171855330467224,
      0.38415607810020447,
      0.5614188313484192,
      0.5174458622932434,
      1,
      0.4807377755641937
    ],
    [
      0.49724820256233215,
      0.44372376799583435,
      0.5190407037734985,
      0.6165656447410583,
      0.4807377755641937,
      0.9999998807907104
    ]
    ];

    private update() {
        const stormPosition = this.stormObject.getTransform().getWorldPosition();

        for (let i = 0; i < this.subSceneObjects.length; i++) {
            const currentObject = this.subSceneObjects[i];
            const currentPosition = currentObject.getTransform().getWorldPosition();

            let totalForce = vec3.zero();

            for (let j = 0; j < this.subSceneObjects.length; j++) {
            if (i === j) continue;

            const otherObject = this.subSceneObjects[j];
            const otherPosition = otherObject.getTransform().getWorldPosition();

            // Calculate direction vector from current object to the other object
            const directionVector = otherPosition.sub(currentPosition);
            const distance = directionVector.length;
            const direction = directionVector.normalize();

            // Add a force in the direction of the other object (adjust the magnitude as needed)
            const forceMagnitude = this.weights[i][j]; // Example force value
            const spring_scale = 10;
            const force = direction.uniformScale(forceMagnitude * spring_scale);

            // // Add a damping term to reduce oscillations or excessive movement
            // const dampingFactor = 0.1; // Adjust the damping factor as needed
            // const velocity = currentObject.getComponent("Physics.BodyComponent").velocity
            // const dampingForce = velocity.uniformScale(-dampingFactor);

            const storm_scale = 0.1;
            // Add a center force to the current object
            const centerForce = stormPosition.sub(currentPosition).normalize().uniformScale(storm_scale);
            totalForce = totalForce.add(centerForce);


            // calculate
            const a = 0.001
            const b = 50
            const k = 5000


            const chargeScale = - 1/(distance**2) * k
            const chargeForce = direction.uniformScale(chargeScale)

            const holdDistance = 20
            const holdScale = 1/((distance)**2) * k

            print("chargeForce: " + chargeForce.length.toString());
            const forceDifference = chargeForce.sub(force).length;
            print(`${forceDifference.toString()}`);

            totalForce = totalForce.add(chargeForce)

            // Add the damping force to the total force
            // totalForce = totalForce.add(dampingForce);

            totalForce = totalForce.add(force);

            // Store the total force for the current object
            currentObject.getComponent("Physics.BodyComponent").addForce(totalForce, Physics.ForceMode.Force);
        }}
    }
}
