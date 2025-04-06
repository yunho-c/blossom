// Simplified script to apply a continuous force to a physics body

@component
export class BallBehavior extends BaseScriptComponent {

    @input // Assign the Physics Body component in the Inspector
    physicsBody: BodyComponent;

    @input // Default force (e.g., upwards) - Adjust in Inspector
    forceToApply: vec3 = new vec3(0, 100, 0);

    // Optional: Input for relative force application
    @input // Apply force relative to object's rotation?
    applyRelativeForce: boolean = false;

    onAwake() {
        // Check if Physics Body is assigned
        if (!this.physicsBody) {
            print("BallBehavior Warning: Physics.BodyComponent is not assigned in the Inspector. Please assign it.");
            // Optionally disable the script if the body is missing
            // this.enabled = false;
            return;
        }

        // Always bind to update for continuous force
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print("BallBehavior: Continuous force enabled.");
    }

    onUpdate() {
        // Apply continuous force each frame
        // Note: Applying continuous force without limit can lead to extreme velocities.
        if (this.physicsBody) {
            if (this.applyRelativeForce) {
                // Using ForceMode.Force applies force over time (factoring in mass and delta time)
                this.physicsBody.addRelativeForce(this.forceToApply, Physics.ForceMode.Force);
            } else {
                this.physicsBody.addForce(this.forceToApply, Physics.ForceMode.Force);
            }
            // Optional: Log continuous force application (can be spammy)
            // print("Applying continuous force: " + this.forceToApply.toString());
        }
    }
}