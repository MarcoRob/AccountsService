import {Router, Request, Response, NextFunction} from "express";
//const Accounts = require('../../accounts');
import FileWriter from "../controllers/FileWriter";

let fileWriter = new FileWriter();

export class AccountRouter {
    router: Router
    dbManager : any;

    constructor() {
        //this.dbManager = fileWriter;
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res : Response, next: NextFunction) {
        //console.log(this.dbManager);
        res.send(fileWriter.getAll());
    }

    public add(req: Request, res : Response, next: NextFunction) {
        let data : JSON = req.body;
        let email : string = data["email"];
        let name : string = data["name"];
        let isAdded : boolean  = fileWriter.add(email, name);

        if(isAdded) {
            res.statusCode = 200;
            res.send("User Added");
        } else {
            res.statusCode = 400;
            res.send("Invalidad User");
        }
    }

    init() : void {
        this.router.get("/", this.getAll);
        this.router.post("/", this.add);
    }
}

let accountRouter : AccountRouter = new AccountRouter();
accountRouter.init();

export default accountRouter.router;