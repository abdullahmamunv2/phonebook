

export default class OtpVerificationResponse {
    isVerified       : boolean;
    referanceId      : number;
    constructor(isVerified:boolean,referanceId:number){
        this.isVerified = isVerified;
        this.referanceId = referanceId;
    }
}