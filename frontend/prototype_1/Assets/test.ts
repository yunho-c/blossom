@component
export class NewScript extends BaseScriptComponent {
    


    @input // force vector
    forceVector: vec3 = new vec3(0, 0, 0)
    /**
     * Reference to the physics body component of the tennis ball.
     * Used to apply mass, handle collisions, and manipulate velocity.
     */
    physicsBody: BodyComponent
    
    onAwake() {
        this.physicsBody = this.sceneObject.getComponent("Physics.BodyComponent")
        this.physicsBody.mass = 1

        // Register an update event callback to handle per-frame logic.
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this))

    }

    onUpdate() {
        // Apply the force vector to the physics body.
        this.physicsBody.addForce(this.forceVector, Physics.ForceMode.Force)

        // // Optional: Log the force being applied for debugging purposes.
        // print("Applying force: " + this.forceVector.toString())
        // // Optional: Log the current velocity of the physics body.
        // const position = this.physicsBody.getTransform().getLocalPosition()
        // print("Current position: " + position.toString())
    }
    
}
