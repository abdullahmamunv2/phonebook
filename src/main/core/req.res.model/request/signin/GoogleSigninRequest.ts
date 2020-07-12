import BaseSigninRequest from "./BaseSigninRequest";

export default class GoogleSigninRequest extends BaseSigninRequest {
    idToken : string;
    constructor(idToken:string){
        super();
        this.idToken = idToken;
    }
}