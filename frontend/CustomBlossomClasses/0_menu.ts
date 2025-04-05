// This menu has buttons that manually change the experiment from the different subclasses.
// experiment() -> throwable()
// throwable -> thrown_object_trajectory()

// It also lets you 

import { IExperiment, PhysicsExecutor } from './PhysicsEngine';

export interface ExperimentMenuItem {
    id: string;
    name: string;
    description: string;
    createExperiment: () => IExperiment;
}

export class ExperimentMenu {
    private items: ExperimentMenuItem[] = [];
    private executor: PhysicsExecutor;
    private container: HTMLElement;

    constructor(containerId: string) {
        this.executor = PhysicsExecutor.getInstance();
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container element with id '${containerId}' not found`);
        this.container = container;
    }

    addExperiment(item: ExperimentMenuItem): void {
        this.items.push(item);
        this.createMenuItem(item);
    }

    private createMenuItem(item: ExperimentMenuItem): void {
        const menuItem = document.createElement('div');
        menuItem.className = 'experiment-menu-item';
        
        const title = document.createElement('h3');
        title.textContent = item.name;
        
        const description = document.createElement('p');
        description.textContent = item.description;
        
        const button = document.createElement('button');
        button.textContent = 'Start';
        button.onclick = () => this.startExperiment(item);

        menuItem.appendChild(title);
        menuItem.appendChild(description);
        menuItem.appendChild(button);
        this.container.appendChild(menuItem);
    }

    private startExperiment(item: ExperimentMenuItem): void {
        const experiment = item.createExperiment();
        this.executor.setExperiment(experiment);
        this.executor.start();
    }

    // Add default styles to the document
    static addStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
            .experiment-menu-item {
                padding: 1rem;
                margin: 1rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                background: white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .experiment-menu-item h3 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }

            .experiment-menu-item p {
                margin: 0 0 1rem 0;
                color: #666;
            }

            .experiment-menu-item button {
                padding: 0.5rem 1rem;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.2s;
            }

            .experiment-menu-item button:hover {
                background: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }
} 
