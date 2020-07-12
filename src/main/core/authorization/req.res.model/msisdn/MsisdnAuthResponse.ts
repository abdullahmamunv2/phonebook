export default class MsisdnAuthResponse {
    _msisdn   : string;
    _operator : string;
    _prefix   : string;
    _isAuthrized : boolean;
    constructor(msisdn : string,operator : string,prefix:string,isAuthorized:boolean){
        this._msisdn   = msisdn;
        this._operator = operator;
        this._prefix   = prefix;
        this._isAuthrized = isAuthorized;
    }
}