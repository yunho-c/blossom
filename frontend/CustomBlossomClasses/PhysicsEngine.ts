// Core interfaces and types for the Blossom Physics Engine

// Vector type for 2D physics
export interface Vector2D {
    x: number;
    y: number;
}

// Physical properties that all objects must have
export interface PhysicalProperties {
    mass: number;
    position: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    rotation: number; // in radians
}

// Base interface for all physical objects
export interface IPhysicalObject {
    id: string;
    properties: PhysicalProperties;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
}

// Base interface for all experiments
export interface IExperiment {
    id: string;
    name: string;
    objects: IPhysicalObject[];
    isRunning: boolean;
    timeStep: number;
    
    initialize(): void;
    start(): void;
    stop(): void;
    reset(): void;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
}

// Program executor that manages the physics simulation
export class PhysicsExecutor {
    private static instance: PhysicsExecutor;
    private currentExperiment?: IExperiment;
    private lastFrameTime: number = 0;
    private animationFrameId?: number;

    private constructor() {}

    static getInstance(): PhysicsExecutor {
        if (!PhysicsExecutor.instance) {
            PhysicsExecutor.instance = new PhysicsExecutor();
        }
        return PhysicsExecutor.instance;
    }

    setExperiment(experiment: IExperiment): void {
        this.stop();
        this.currentExperiment = experiment;
        this.currentExperiment.initialize();
    }

    start(): void {
        if (!this.currentExperiment) return;
        this.currentExperiment.start();
        this.animate();
    }

    stop(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.currentExperiment) {
            this.currentExperiment.stop();
        }
    }

    private animate(currentTime: number = 0): void {
        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;

        if (this.currentExperiment) {
            this.currentExperiment.update(deltaTime);
            // Assuming we have a canvas context available
            // this.currentExperiment.render(context);
        }

        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }
} 