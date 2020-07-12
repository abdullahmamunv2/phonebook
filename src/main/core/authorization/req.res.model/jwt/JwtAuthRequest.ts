
export default class JwtAuthRequest {
    _token : string=''
    setToken(token:string){
        this._token = token;
    }
    getToken(){
        return this._token;
    }
}