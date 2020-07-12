
export default class Signin {
    static REFERRER : any = {
        DIRECT      : 1,
        GOOGLE      : 2,
        FACEBOOK    : 3
    }
    static CHANNEL : any = {
        WEB : 1,
        ANDROID : 2,
        IOS     : 3
    }
    id?       : string;
    username : string;
    referrer     : number;
    password? : string;
    channel?   : number;
    constructor(username:string,referrer:number){
        this.username = username;
        this.referrer     = referrer;
    }
}