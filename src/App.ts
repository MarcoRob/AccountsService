import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import AccountRouter from './routes/AccountRouter';

class App {

    public express : express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.use(cors({
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
            origin: "*",
            preflightContinue: false
        }));
    }

    private routes(): void {
        this.express.use("/", AccountRouter);
    }
}

export default new App().express;