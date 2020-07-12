import BaseSignupRequest from "./BaseSignupRequest";

export default class DirectSignupRequest extends BaseSignupRequest{
    password : string;
    constructor(username:string,password:string){
        super(username);
        this.password = password;
    }
}