
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
    CONTACT : Symbol.for('IContactEntityGateway<Contact>')
}



TYPE.VALIDATOR = {
    GATEWAY      : Symbol.for('IValidatorGateway<T,S>'),
    ERROR_PARSER : Symbol.for('IValidationErrorParser'),

    CONTACT_CREATE : Symbol.for('IValidator<ContactRequest>')
    
}

TYPE.MAPPER ={}

TYPE.MAPPER.REQUEST = {
    
}

TYPE.MAPPER.RESPONSE = {
    
}

TYPE.HASH  = {
    PASSWORD : Symbol.for('Ihash<password>')
}

TYPE.LOGGER = {
    APPLICATION : Symbol.for('Application')
}


