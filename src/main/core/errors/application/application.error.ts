export default class ApplicationError {
    code : number|string;
    message : string='';
    constructor(message : string='' , errorCode:number|string=0){
        this.message = message;
        this.code = errorCode;
    }
}