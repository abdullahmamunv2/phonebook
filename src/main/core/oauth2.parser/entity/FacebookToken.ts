
export default class FacebookTokenInfo{
    static GENDER : any = {
        male : 1,
        female : 2,
        other  :3
    } 
    fbId : string;
    gender : number = -1;
    dob?    : Date;
    name   : string='';
    avatar : string='';
    constructor(fbId:string){
        this.fbId = fbId;
    }
}