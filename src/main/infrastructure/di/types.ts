export const TYPE : any = {
}

TYPE.AUTH = {
    TOKEN_PARSER : Symbol.for('ITokenParser<T>'),
    SECRET_PARSER : Symbol.for('ITokenParser<boolean>'),
    BASIC_AUTH_PARSER : Symbol.for('IBasicAuthParser'),
    BAISC_AUTH_VALIDATOR : Symbol.for('ITokenValidator<BasicToken>')
}

TYPE.AUTH.CONFIG = {
    SECRET : Symbol.for('PushSecretConfig')
}

TYPE.CONTROLLER = {
   CONTACT_CREATE : Symbol.for('ContactController')

}

TYPE.LOGGER = {
    DATABASE  : Symbol.for('DatabaseLogger'),
    API       : Symbol.for('APILogger'),
    APPLICATION : Symbol.for('ApplicationLogger')
}

TYPE.DATABASE = {
    MANAGER         :  Symbol.for('DatabaseManager'),
    MONGO_MANAGER     : Symbol.for('MongoDManager'),
    ERROR_PARSER    : Symbol.for('IEntityGatewayErrorParser')
}

TYPE.API = {
    ERROR_PARSER : Symbol.for('IAPIEntityGatewayErrorParser')
}

TYPE.CONFIG = {
    DATABASE : Symbol.for('DatabaseConfig'),
    MONGO_DATABASE : Symbol.for('MongoDBConfig'),
    GOOGLE_OAUTH2 : Symbol.for('GoogleOauth2Config'),
    TOKEN    : Symbol.for('TokenSecret'),
    XMPP     : Symbol.for('XmppConfig'),
    SIP      : Symbol.for('SipConfig'),
    UPLOAD   : Symbol.for('UploadConfig'),
    PUSH     : Symbol.for('PushNotificationConfig')

}

TYPE.REPOSITORY = {
    CONTACT : Symbol.for('IContactRepository')

}

