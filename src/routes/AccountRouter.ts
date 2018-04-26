import {Router, Request, Response, NextFunction} from "express";
import AccountController from "../controllers/AccountController";

export class AccountRouter {
    router: Router;

    constructor() {
        let accountController = new AccountController();
        this.router = Router();

        this.router.get("/", accountController.getAll);
        this.router.post("/", accountController.add);
        this.router.post("/login", accountController.login);
    }
    
}

export default new AccountRouter().router;