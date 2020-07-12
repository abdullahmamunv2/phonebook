
export default class OtpSendResponse{
    referenceId : string;
    expireIn  : number;
    constructor(referanceId:string,expireIn:number){
        this.referenceId    = referanceId;
        this.expireIn      = expireIn;
    }
}