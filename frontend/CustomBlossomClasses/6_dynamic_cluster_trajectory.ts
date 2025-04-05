// This extends the dynamic cluster class to include a trajectory, akin to gravity with a spring as friction, or something like that
// The trajectory is a list of points in 3-space that the experiment items will move along.
// The trajectory is a function that returns the points in 3-space that the experiment items will move along.
// The trajectory is a function that returns the points in 3-space that the experiment items will move along.
// The trajectory is a function that returns the points in 3-space that the experiment items will move along.
// The trajectory is a function that returns the points in 3-space that the experiment items will move along.

import { StaticCluster, ClusterNode } from './5_static_cluster';
import { Trajectory } from './4_thrown_object_trajectory';
import { Vector2D, PhysicalProperties } from './PhysicsEngine';

export interface DynamicClusterNode extends ClusterNode {
    trajectory: Trajectory;
    mass: number;
    isMoving: boolean;
}

export class DynamicCluster extends StaticCluster {
    private gravitationalConstant: number = 6.67430e-11;
    private timeScale: number = 1.0;
    private movingNodes: Set<string> = new Set();

    constructor(timeScale: number = 1.0) {
        super();
        this.timeScale = timeScale;
    }

    addMovingNode(node: DynamicClusterNode): void {
        super.addNode(node);
        this.movingNodes.add(node.id);
    }

    removeMovingNode(nodeId: string): void {
        super.removeNode(nodeId);
        this.movingNodes.delete(nodeId);
    }

    update(deltaTime: number): void {
        // First update spring forces from StaticCluster
        super.update(deltaTime * this.timeScale);

        // Then apply gravitational forces between moving nodes
        this.movingNodes.forEach(nodeId => {
            const node = this.getNode(nodeId) as DynamicClusterNode;
            if (!node || !node.isMoving) return;

            this.movingNodes.forEach(otherNodeId => {
                if (nodeId === otherNodeId) return;
                
                const otherNode = this.getNode(otherNodeId) as DynamicClusterNode;
                if (!otherNode || !otherNode.isMoving) return;

                this.applyGravitationalForce(node, otherNode, deltaTime * this.timeScale);
            });

            // Update trajectory
            node.trajectory.addPoint(node.properties.position, performance.now());
        });
    }

    private applyGravitationalForce(node1: DynamicClusterNode, node2: DynamicClusterNode, deltaTime: number): void {
        const dx = node2.properties.position.x - node1.properties.position.x;
        const dy = node2.properties.position.y - node1.properties.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        // Calculate gravitational force
        const force = this.gravitationalConstant * ((node1.mass * node2.mass) / (distance * distance));
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        // Apply forces
        node1.properties.acceleration.x += fx / node1.mass;
        node1.properties.acceleration.y += fy / node1.mass;
        node2.properties.acceleration.x -= fx / node2.mass;
        node2.properties.acceleration.y -= fy / node2.mass;
    }

    render(context: CanvasRenderingContext2D): void {
        // First render connections and static nodes
        super.render(context);

        // Then render trajectories for moving nodes
        this.movingNodes.forEach(nodeId => {
            const node = this.getNode(nodeId) as DynamicClusterNode;
            if (node && node.isMoving) {
                node.trajectory.render(context);
            }
        });
    }

    private getNode(nodeId: string): ClusterNode | undefined {
        return Array.from(this.nodes.values()).find(node => node.id === nodeId);
    }
}
