
export default class User {
    private name : string;
    private email : string;
    
    constructor(name:string, email:string) {
        this.name = name;
        this.email = email;
    }

    public validateEmail() : boolean {
        let regexExp = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        let isValid = regexExp.test(this.email);
        return isValid;
    }

    public getUserId() : string {
        return this.email.split("@")[0];
    }

    public getUserObject() : JSON {
        let userObject = {
            "name" : this.name,
            "email" : this.email,
            "user" : this.getUserId()
        }
        return JSON.parse(JSON.stringify(userObject));
    }

}