import * as fs from "fs";
import IWriter from "./IWriter";
const DBPATH = process.cwd() + "/accounts.json";

export default class FileWriter implements IWriter {
    
    dbPath : string = DBPATH;

    constructor() {
        this.init();
    }

    public init() {
        if(fs.existsSync(this.dbPath)) {
            return "Database already created";
        } else {
            fs.writeFileSync(this.dbPath, "[]");
            return "Database created";
        }
    }

    public add(email:string, name:string) : boolean {
        let users : any = this.getAll();
        let userId = this.getUserId(email);

        if(!this.get(userId)) {
            users[userId] = {"email":email, "user":userId, "name":name};
            fs.writeFileSync(this.dbPath, JSON.stringify(users));
            return true;
        }
        return false;
    }

    public delete(user:string) : boolean {

        return false;
    }

    public get(user:string) : JSON {
        let db = this.getAll();
        if(db[user]) {
            return db[user];
        } 
        return null;
    }

    public getAll() : JSON {
        let db = fs.readFileSync(this.dbPath).toString() || "{}";
        console.log(db);
        return JSON.parse(db);
    }

    public getUserId(email:string) : string {
        return email.split("@")[0];
    }
}