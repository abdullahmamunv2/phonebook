import BaseSigninRequest from './BaseSigninRequest';
export default class FacebookSigninRequest extends BaseSigninRequest {
    accessToken : string;
    fbId : string;
    constructor(accessToken:string, fbId:string){
        super();
        this.accessToken = accessToken;
        this.fbId = fbId;
    }
}