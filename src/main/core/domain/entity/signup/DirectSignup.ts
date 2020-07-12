import BaseSignup from "./BaseSingup";
import {v4 as uuidv4} from 'uuid';

const MOBILE_REGEX = /^\d+$/
export default class DirectSignup extends BaseSignup{
    
    userId?   : string;
    password : string;
    isUsernameAvailable : boolean = false;
    constructor(username:string,password:string){
        super(username,BaseSignup.REFERRER.DIRECT);
        this.password = password;
    }

    parseUsername(){
        if(MOBILE_REGEX.test(this.username)){
            this.type = BaseSignup.USER_TYPE.MOBILE;
        }
        else{
            this.type = BaseSignup.USER_TYPE.EMAIL;
        }
    }
}