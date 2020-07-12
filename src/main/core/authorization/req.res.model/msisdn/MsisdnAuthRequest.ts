export default class MsisdnAuthRequest {
    _msisdn : string
    constructor(msisdn : string){
        this._msisdn = msisdn
    }
    getMsisdn(){
        return this._msisdn;
    }
}