import ILoader from "./ILoader";
import * as fs from "fs";

const DBPATH = process.cwd() + "/accounts.json";

export default class FileLoader implements ILoader {

    dbPath : string = DBPATH;

    constructor() { 
        if(fs.existsSync(this.dbPath)) {
            console.log("Database already created");
        } else {
            fs.writeFileSync(this.dbPath, "{}");
            console.log("Database created");
        }
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
}