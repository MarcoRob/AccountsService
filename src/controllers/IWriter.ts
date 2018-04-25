export default interface IWriter {

    add(email:string, name:string) : boolean;

    delete(user:string) : boolean;

    get(user:string) : JSON;

    getAll() : JSON;
}