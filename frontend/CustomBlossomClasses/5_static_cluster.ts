// The static cluster consists of a list of static experiment items, and their locations in 3-space (on a plane / grid)
// The cluster has a function that returns the experiment items in the cluster
// The cluster has a function that returns the locations of the experiment items in the cluster
// The cluster has a function that returns the mass of the experiment items in the cluster
// The cluster has a function that returns the size of the experiment items in the cluster
// The cluster has a function that returns the color of the experiment items in the cluster

import { Vector2D, IPhysicalObject, PhysicalProperties } from './PhysicsEngine';

export interface ClusterNode extends IPhysicalObject {
    connections: Set<string>; // IDs of connected nodes
    strength: number; // Connection strength/weight
    label: string;
}

export class StaticCluster {
    protected nodes: Map<string, ClusterNode> = new Map();
    private springConstant: number = 0.1;
    private dampingFactor: number = 0.8;
    private minDistance: number = 50;
    private maxDistance: number = 200;

    addNode(node: ClusterNode): void {
        this.nodes.set(node.id, node);
    }

    removeNode(nodeId: string): void {
        const node = this.nodes.get(nodeId);
        if (!node) return;

        // Remove connections to this node from other nodes
        node.connections.forEach(connectedId => {
            const connectedNode = this.nodes.get(connectedId);
            if (connectedNode) {
                connectedNode.connections.delete(nodeId);
            }
        });

        this.nodes.delete(nodeId);
    }

    connect(nodeId1: string, nodeId2: string, strength: number): void {
        const node1 = this.nodes.get(nodeId1);
        const node2 = this.nodes.get(nodeId2);

        if (!node1 || !node2) return;

        node1.connections.add(nodeId2);
        node2.connections.add(nodeId1);
        node1.strength = node2.strength = strength;
    }

    update(deltaTime: number): void {
        // Apply spring forces between connected nodes
        this.nodes.forEach(node => {
            node.connections.forEach(connectedId => {
                const connectedNode = this.nodes.get(connectedId);
                if (!connectedNode) return;

                const dx = connectedNode.properties.position.x - node.properties.position.x;
                const dy = connectedNode.properties.position.y - node.properties.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.minDistance || distance > this.maxDistance) {
                    const force = this.springConstant * (distance - this.minDistance);
                    const fx = (dx / distance) * force;
                    const fy = (dy / distance) * force;

                    // Apply force to both nodes
                    node.properties.velocity.x += fx * deltaTime;
                    node.properties.velocity.y += fy * deltaTime;
                    connectedNode.properties.velocity.x -= fx * deltaTime;
                    connectedNode.properties.velocity.y -= fy * deltaTime;
                }
            });

            // Apply damping
            node.properties.velocity.x *= this.dampingFactor;
            node.properties.velocity.y *= this.dampingFactor;

            // Update position
            node.properties.position.x += node.properties.velocity.x * deltaTime;
            node.properties.position.y += node.properties.velocity.y * deltaTime;
        });
    }

    render(context: CanvasRenderingContext2D): void {
        // Draw connections
        context.beginPath();
        this.nodes.forEach(node => {
            node.connections.forEach(connectedId => {
                const connectedNode = this.nodes.get(connectedId);
                if (!connectedNode) return;

                context.moveTo(node.properties.position.x, node.properties.position.y);
                context.lineTo(connectedNode.properties.position.x, connectedNode.properties.position.y);
            });
        });
        context.strokeStyle = 'rgba(150, 150, 150, 0.5)';
        context.stroke();

        // Draw nodes
        this.nodes.forEach(node => node.render(context));
    }
}
