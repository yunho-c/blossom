import { Vector2D, IPhysicalObject, PhysicalProperties } from './PhysicsEngine';

export interface TrajectoryPoint {
    position: Vector2D;
    time: number;
}

export class Trajectory {
    private points: TrajectoryPoint[] = [];
    private maxPoints: number;
    private samplingRate: number; // How often to record points (in ms)
    private lastSampleTime: number = 0;

    constructor(maxPoints: number = 50, samplingRate: number = 16) { // 60fps ≈ 16ms
        this.maxPoints = maxPoints;
        this.samplingRate = samplingRate;
    }

    addPoint(position: Vector2D, currentTime: number): void {
        if (currentTime - this.lastSampleTime < this.samplingRate) return;

        this.points.push({ position: { ...position }, time: currentTime });
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
        this.lastSampleTime = currentTime;
    }

    clear(): void {
        this.points = [];
        this.lastSampleTime = 0;
    }

    render(context: CanvasRenderingContext2D): void {
        if (this.points.length < 2) return;

        context.beginPath();
        context.moveTo(this.points[0].position.x, this.points[0].position.y);

        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].position.x, this.points[i].position.y);
        }

        context.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        context.lineWidth = 2;
        context.stroke();
    }
}

export class ThrownObjectWithTrajectory implements IPhysicalObject {
    id: string;
    properties: PhysicalProperties;
    trajectory: Trajectory;

    constructor(id: string, initialProperties: PhysicalProperties) {
        this.id = id;
        this.properties = initialProperties;
        this.trajectory = new Trajectory();
    }

    update(deltaTime: number): void {
        // Update position based on velocity
        this.properties.position.x += this.properties.velocity.x * deltaTime;
        this.properties.position.y += this.properties.velocity.y * deltaTime;

        // Update velocity based on acceleration
        this.properties.velocity.x += this.properties.acceleration.x * deltaTime;
        this.properties.velocity.y += this.properties.acceleration.y * deltaTime;

        // Record trajectory point
        this.trajectory.addPoint(this.properties.position, performance.now());
    }

    render(context: CanvasRenderingContext2D): void {
        // Render trajectory
        this.trajectory.render(context);

        // Render object
        context.beginPath();
        context.arc(
            this.properties.position.x,
            this.properties.position.y,
            10, // radius
            0,
            Math.PI * 2
        );
        context.fillStyle = 'blue';
        context.fill();
    }

    clearTrajectory(): void {
        this.trajectory.clear();
    }
}
