
export default class GoogleTokenInfo{
    userId : string;
    email  : string;
    name?   : string;
    picture? : string;
    constructor(userId:string,email:string,name?:string,picture?:string){
        this.userId = userId;
        this.email  = email;
        this.name   = name;
        this.picture = picture;
    }
}