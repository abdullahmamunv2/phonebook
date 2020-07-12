import BaseSigninRequest from "./BaseSigninRequest";


export default class DirectSigninRequest extends BaseSigninRequest{
    username : string;
    password : string;
    constructor (uname : string, pswd : string){
        super();
        this.username = uname;
        this.password = pswd;
    }
}