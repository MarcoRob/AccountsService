import * as fs from "fs";
import IWriter from "./IWriter";
import ILoader from "./ILoader";
import FileLoader from "./FileLoader";
import User from "../models/User";

const DBPATH = process.cwd() + "/accounts.json";

let fileLoader : ILoader = new FileLoader();


export default class FileWriter implements IWriter {
    
    dbPath : string = DBPATH;
    fileLoader : ILoader = fileLoader;
    constructor() {}

    public add(email:string, name:string) : boolean {
        let users : any = this.fileLoader.getAll();
        let newUser : User = new User(name, email);
        let userId : string = newUser.getUserId();
        if(!this.fileLoader.get(userId)) {
            if(newUser.validateEmail() == false) {
                return false;
            }
            users[userId] = newUser.getUserObject();
            fs.writeFileSync(this.dbPath, JSON.stringify(users));
            return true;
        }
        return false;
    }

    public delete(user:string) : boolean {
        let users_db : any = this.fileLoader.getAll();
        if(users_db[user]) {
            delete users_db[user];
            fs.writeFileSync(this.dbPath, JSON.stringify(users_db));
            return true;
        }
        return false;
    }

    public getUserId(email:string) : string {
        return email.split("@")[0];
    }
}