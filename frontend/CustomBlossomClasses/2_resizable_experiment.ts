// This extends the experiment class to include a resizable canvas.
// Mass: changeable value
// A function that resizes the image

import { BaseExperiment } from './1_experiment';
import { Vector2D } from './PhysicsEngine';

export interface ResizableProperties {
    minSize: Vector2D;
    maxSize: Vector2D;
    currentSize: Vector2D;
}

export abstract class ResizableExperiment extends BaseExperiment {
    protected boundaries: ResizableProperties;

    constructor(id: string, name: string, boundaries: ResizableProperties) {
        super(id, name);
        this.boundaries = boundaries;
    }

    resize(newSize: Vector2D): void {
        // Ensure size is within bounds
        this.boundaries.currentSize = {
            x: Math.max(this.boundaries.minSize.x, 
               Math.min(this.boundaries.maxSize.x, newSize.x)),
            y: Math.max(this.boundaries.minSize.y,
               Math.min(this.boundaries.maxSize.y, newSize.y))
        };

        // Allow subclasses to handle resize
        this.onResize();
    }

    // Abstract method for subclasses to handle resize events
    protected abstract onResize(): void;

    // Override render to handle boundaries
    render(context: CanvasRenderingContext2D): void {
        // Update canvas size if needed
        if (context.canvas.width !== this.boundaries.currentSize.x ||
            context.canvas.height !== this.boundaries.currentSize.y) {
            context.canvas.width = this.boundaries.currentSize.x;
            context.canvas.height = this.boundaries.currentSize.y;
        }

        super.render(context);
    }
}