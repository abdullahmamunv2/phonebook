
export default class JwtAuthResponse {
    userId : number;
    jid    : string;
    sid    : string;
    referrer:number;
    constructor(userId:number,jid:string,sid:string,referrer:number){
        this.userId = userId;
        this.jid    = jid;
        this.sid    = sid;
        this.referrer = referrer;
    }
}