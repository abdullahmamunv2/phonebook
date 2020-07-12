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
   DIRECT_SIGNUP : Symbol.for('DirectSignupController'),
   SEND_OTP      : Symbol.for('OtpSendController'),
   OTP_VERIFY    : Symbol.for('OtpVerificationController'),
   GOOGLE_SIGN_IN : Symbol.for('GoogleSigninController'),
   DIRECT_SIGN_IN : Symbol.for('DirectSigninController'),
   FACEBOOK_SIGN_IN : Symbol.for('FacebookSigninController'),
   FRIEND_REQUEST : Symbol.for('FriendRequestController'),
   PENDING_LIST : Symbol.for('PendingListController'),
   REQUEST_ACCEPT : Symbol.for('RequestAcceptController'),
   REQUEST_DELETE : Symbol.for('RequestDeleteController'),
    

   UPLOAD        : Symbol.for('UploadController'),
   PROFILE_UPSERT : Symbol.for('ProfileUpsertController'),
   PROFILE_READ  : Symbol.for('ProfileReadController'),

   SIP_STATUS    : Symbol.for('SipStatusController'),
   USER_LOCATION : Symbol.for('UserLocationController'),
   USER_NEAREST  : Symbol.for('NearestUserController'),
   CONVERSATION_READ : Symbol.for('ConversationController'),
   CONVERSATION_READ_ID : Symbol.for('ConversationReadController'),
   PUSH_NOTIFICATION : Symbol.for('PushNotificationController')

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
    SIGNUP : Symbol.for('ISignupRepository'),
    SIGNIN : Symbol.for('ISigninRepository'),
    TOKEN  : Symbol.for('ITokenRepository'),
    OTP    : Symbol.for('IOtpRepository'),
    XMPP_USER : Symbol.for('IXMPPUserRepository'),
    SIP    : Symbol.for('ISIPRepository'),
    PROFILE : Symbol.for('IProfileRepository'),
    UPLOAD  : Symbol.for('IUploadRepository'),
    FACEBOOK : Symbol.for('IFacebookRepository'),
    FRIEND_REQUEST : Symbol.for('IFriendRequestRepository'),
    USER_LOCATION : Symbol.for('IUserLocationRepository'),
    USER_NEAREST : Symbol.for('INearestUserRepository'),
    DEVICE_INFO  : Symbol.for('IDeviceInfoRepository'),
    PUSH         : Symbol.for('IPushNotificationRepository'),
    CONVERSATION : Symbol.for('IConversationRepository'),
    USER_INFO    : Symbol.for('IUserInfoRepository')

}

