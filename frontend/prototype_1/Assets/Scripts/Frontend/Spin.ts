@component
export class Spin extends BaseScriptComponent {
    @input('float') rotationSpeed: number = 1.0; // Speed of rotation

    onUpdate(event: UpdateEvent) {
        // Calculate rotation based on time and speed
        const rotation = quat.fromEulerAngles(0, this.rotationSpeed * event.getDeltaTime(), 0);
        this.getSceneObject().getTransform().setLocalRotation(rotation.multiply(this.getSceneObject().getTransform().getLocalRotation()));
    }
}