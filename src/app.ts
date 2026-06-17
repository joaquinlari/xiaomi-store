import express, { Application } from 'express';
import { config } from './config';

export class App {
    public readonly app: Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    public start() {
        this.app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    }
}