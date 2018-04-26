import {Router, Request, Response, NextFunction} from "express";
import AccountController from "../controllers/AccountController";

export class AccountRouter {
    router: Router;

    constructor() {
        let accountController = new AccountController();
        this.router = Router();

        this.router.get("/accounts", accountController.getAll);
        this.router.post("/accounts", accountController.add);
        this.router.post("/login", accountController.login);
        this.router.delete("/accounts/:userId", accountController.delete);
    }
    
}

export default new AccountRouter().router;