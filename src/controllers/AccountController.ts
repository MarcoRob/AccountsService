import {Request, Response, NextFunction} from "express";
import FileWriter from "./FileWriter";
import IWriter from "./IWriter";
import ILoader from "./ILoader";
import FileLoader from "./FileLoader";
import User from "../models/User";

let fileWriter : IWriter = new FileWriter();
let fileLoader : ILoader = new FileLoader();

export default class AccountController {

    constructor() {
        //this.fileWriter = new FileWriter();
    }
    public getAll(req: Request, res : Response, next: NextFunction) {
        res.send(fileLoader.getAll());
    }

    public login(req: Request, res : Response, next: NextFunction) {
        let user = req.body.email || "";
        console.log("User " + user);
            user = user.split("@")[0];
        if(fileLoader.get(user)) {
            res.statusCode = 200;
            res.send({message:"Success Login!"});
        }
        res.statusCode = 401;
        res.send({message:"Bad Credentials"});
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


}