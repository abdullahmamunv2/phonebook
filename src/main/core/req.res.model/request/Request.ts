export default class Request<B,H={}>{
    _body   : B;
    _header? : H;
    constructor(body : B,header?:H){
        this._body      = body;
        this._header    = header;
    }
    getBody(){
        return this._body
    }
    getHeader(){
        return this._header;
    }
}

