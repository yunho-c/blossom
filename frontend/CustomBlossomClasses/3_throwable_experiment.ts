import { ResizableExperiment, ResizableProperties } from './2_resizable_experiment';
import { Vector2D, IPhysicalObject } from './PhysicsEngine';

interface ThrowableObject extends IPhysicalObject {
    isGrabbed: boolean;
    grab(position: Vector2D): void;
    release(velocity: Vector2D): void;
}

export abstract class ThrowableExperiment extends ResizableExperiment {
    protected throwableObjects: ThrowableObject[] = [];
    protected grabbedObject?: ThrowableObject;
    protected dragStartPosition?: Vector2D;

    constructor(id: string, name: string, boundaries: ResizableProperties) {
        super(id, name, boundaries);
    }

    // Mouse/Touch event handlers
    onPointerDown(position: Vector2D): void {
        // Find and grab the first throwable object under the pointer
        this.grabbedObject = this.findThrowableAtPosition(position);
        if (this.grabbedObject) {
            this.dragStartPosition = position;
            this.grabbedObject.grab(position);
        }
    }

    onPointerMove(position: Vector2D): void {
        if (this.grabbedObject && this.dragStartPosition) {
            // Update object position while dragging
            this.grabbedObject.properties.position = position;
        }
    }

    onPointerUp(position: Vector2D): void {
        if (this.grabbedObject && this.dragStartPosition) {
            // Calculate throw velocity based on drag
            const velocity: Vector2D = {
                x: (position.x - this.dragStartPosition.x) * 5, // Scale factor for throw strength
                y: (position.y - this.dragStartPosition.y) * 5
            };
            
            this.grabbedObject.release(velocity);
            this.grabbedObject = undefined;
            this.dragStartPosition = undefined;
        }
    }

    protected abstract findThrowableAtPosition(position: Vector2D): ThrowableObject | undefined;

    // Override collision handling for throwable objects
    protected handleCollisions(): void {
        // Handle collisions between throwable objects and boundaries
        this.throwableObjects.forEach(obj => {
            if (obj.isGrabbed) return; // Skip collision check for grabbed objects
            
            // Implement boundary collision logic
            this.handleBoundaryCollision(obj);
        });

        // Handle collisions between throwable objects
        for (let i = 0; i < this.throwableObjects.length; i++) {
            for (let j = i + 1; j < this.throwableObjects.length; j++) {
                this.handleObjectCollision(this.throwableObjects[i], this.throwableObjects[j]);
            }
        }
    }

    protected abstract handleBoundaryCollision(obj: ThrowableObject): void;
    protected abstract handleObjectCollision(obj1: ThrowableObject, obj2: ThrowableObject): void;
} 