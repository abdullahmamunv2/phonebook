export const TYPE : any = {
}

TYPE.AUTH = {
    TOKEN       : Symbol.for('IAuthorization<TokenAuthRequest,TokenAuthResponse>'),
    MSISDN      : Symbol.for('IAuthorization<MsisdnAuthRequest,MsisdnAuthResponse>'),
    BASIC       : Symbol.for('IAuthorization<BasicAuthRequest,BasicAuthResponse>'),
    SECRET      : Symbol.for('IAuthorization<string,boolean>')
}

TYPE.OAUTH2_TOKEN_PARSER = {
    GOOGLE : Symbol.for('IGoogleIdTokenParser<GoogleTokenInfo>'),
    FACEBOOK : Symbol.for('IFacebookTokenParser<FacebookTokenInfo>'),
}

TYPE.ENTITY_GATEWAY = {
    SIGNUP      : Symbol.for('IDirectSignupEntityGateway'),
    OTP         : Symbol.for('IOtpEntityGateway'),
    TOKEN       : Symbol.for('ITokenEntityGateway'),
    GOOGLE_SIGNIN : Symbol.for('IGoogleSigninEntityGateway'),
    FACEBOOK_SIGNIN : Symbol.for('IFacebookSigninEntityGateway'),
    DIRECT_SIGNIN : Symbol.for('IDirectSigninEntityGateway'),
    UPLOAD      : Symbol.for('IUploadEntityGateway'),
    PROFILE     : Symbol.for('IProfileEntityGateway')
}



TYPE.VALIDATOR = {
    GATEWAY      : Symbol.for('IValidatorGateway<T,S>'),
    ERROR_PARSER : Symbol.for('IValidationErrorParser'),
    COMMENT_ADD_VALIDATOR : Symbol.for('IValidator<DirectSigninRequest>'), 

    DIRECT_SIGNUP : Symbol.for('IValidator<DirectSignupRequest>'),
    OTP_SEND     : Symbol.for('IValidator<OtpSendRequest>'),
    OTP_VERIFY   : Symbol.for('IValidator<OtpVerificationRequest>'),
    DIRECT_SIGNIN : Symbol.for('IValidator<DirectSigninRequest>'),
    PROFILE      : Symbol.for('IValidator<ProfileRequest>'),
    FACEBOOK_SIGNIN : Symbol.for('IValidator<FacebookSigninRequest>')
}

TYPE.MAPPER ={}

TYPE.MAPPER.REQUEST = {
    UPLOAD : Symbol.for('IMapper<UploadRequest,File>'),
    PROFILE : Symbol.for('IMapper<ProfileRequest,Profile>')
}

TYPE.MAPPER.RESPONSE = {
    UPLOAD : Symbol.for('IMapper<File,UploadResponse>'),
    PROFILE : Symbol.for('IMapper<Profile,ProfileResponse>'),
    TOKEN   : Symbol.for('IMapper<Signin,TokenResponse>')
}

TYPE.HASH  = {
    PASSWORD : Symbol.for('Ihash<password>')
}

TYPE.LOGGER = {
    APPLICATION : Symbol.for('Application')
}


