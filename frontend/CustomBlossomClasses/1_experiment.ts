import { IExperiment, IPhysicalObject } from './PhysicsEngine';

export abstract class BaseExperiment implements IExperiment {
    id: string;
    name: string;
    objects: IPhysicalObject[] = [];
    isRunning: boolean = false;
    timeStep: number = 1/60; // 60 FPS by default
    
    protected wordString?: string;  // The string representing the person's idea
    protected gravity: number = 9.81;  // m/s²

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    initialize(): void {
        this.objects = [];
        this.isRunning = false;
        this.setupExperiment();
    }

    start(): void {
        this.isRunning = true;
    }

    stop(): void {
        this.isRunning = false;
    }

    reset(): void {
        this.initialize();
    }

    update(deltaTime: number): void {
        if (!this.isRunning) return;
        
        // Update physics for all objects
        this.objects.forEach(obj => {
            obj.update(deltaTime);
        });

        // Check for collisions
        this.handleCollisions();
    }

    render(context: CanvasRenderingContext2D): void {
        // Clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        // Render all objects
        this.objects.forEach(obj => {
            obj.render(context);
        });
    }

    // Abstract methods that must be implemented by subclasses
    protected abstract setupExperiment(): void;
    protected abstract handleCollisions(): void;

    // Utility methods
    protected addObject(object: IPhysicalObject): void {
        this.objects.push(object);
    }

    protected removeObject(objectId: string): void {
        this.objects = this.objects.filter(obj => obj.id !== objectId);
    }
}
