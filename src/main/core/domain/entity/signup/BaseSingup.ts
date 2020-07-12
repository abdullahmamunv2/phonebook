export default abstract class BaseSignup {
    static USER_TYPE :any = {
        UNIDENTIFIED : -1,
        MOBILE       : 0,
        EMAIL        : 1
    }
    static REFERRER : any = {
        DIRECT      : 1,
        GOOGLE      : 2,
        FACEBOOK    : 3
    }
    type : number = BaseSignup.USER_TYPE.UNIDENTIFIED
    referrer : number;
    username : string;
    constructor(username:string,referrer:number){
        this.username = username;
        this.referrer = referrer;
    }
    abstract parseUsername():void;
}