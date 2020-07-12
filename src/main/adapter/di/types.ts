import { Request } from 'express';
import { symbol } from "@hapi/joi"

export const TYPE : any = {
    
}

TYPE.INTERACTOR = {
    EXECUTOR            : Symbol.for('InteractorExecutor'),
    DIRECT_SIGNUP       : Symbol.for('Interactor<Request<SignupRequest>,SignupResponse>'),
    SEND_OTP            : Symbol.for('Interactor<Request<OtpSendRequest>,OtpSendResponse>'),
    OTP_VERIFY          : Symbol.for('Interactor<Request<OtpVerificationRequest>,OtpVerificationResponse>'),
    GOOGLE_SIGN_IN      : Symbol.for('Interactor<GoogleSignupRequest,GoogleSignupResponse>'),
    FACEBOOK_SIGN_IN      : Symbol.for('Interactor<FacebookSigninRequest,TokenResponse>'),
    DIRECT_SIGN_IN      : Symbol.for('Interactor<DirectSigninInteractor>'),
    UPLOAD              : Symbol.for('Interactor<Request<UploadRequest,JwtAuthRequest>,UploadResponse>'),
    PROFILE             : Symbol.for('Interactor<Request<ProfileRequest,JwtAuthRequest>,ProfileResponse>'),
    PROFILE_READ        : Symbol.for('Interactor<Request<{},JwtAuthRequest>,ProfileResponse>'),
    SIP_STATUS          : Symbol.for('Interactor<Request<{},JwtAuthRequest>,SipResponse>'),
    FRIEND_REQUEST      : Symbol.for('Interactor<Request<FriendRequestReq,JwtAuthRequest>,FriendRequestCreateResponse>'),
    PENDING_LIST      : Symbol.for('Interactor<Request<FriendRequestReq,JwtAuthRequest>,PendingListResponse>'),
    REQUEST_ACCEPT      : Symbol.for('Interactor<Request<FriendRequestReq,JwtAuthRequest>,RequestAcceptResponse>'),
    REQUEST_DELETE      : Symbol.for('Interactor<Request<FriendRequestReq,JwtAuthRequest>,FriendRequestDeleteResponse>'),
    USER_LOCATION       : Symbol.for('Interactor<Request<LocationRequest,JwtAuthRequest>,LocationResponse>'),
    USER_NEAREST        : Symbol.for('Interactor<Request<{},JwtAuthRequest>,NearestUsersResponse>'),
    CONVERSATION_READ   : Symbol.for('Interactor<Request<{},JwtAuthRequest>,ConversationResponse[]>'),
    CONVERSATION_READ_ID   : Symbol.for('Interactor<Request<number,JwtAuthRequest>,ConversationResponse>'),
    PUSH_NOTIFICATION   : Symbol.for('Interactor<Request<PushNotificationRequest,string>,PushResponse>')
}

TYPE.PRESENTER = {
    ERROR : Symbol.for('ErrorPresenter'),
    DIRECT_SIGNUP : Symbol.for('DirectSignupPresenter'),
    UPLOAD        : Symbol.for('IPresenter<UploadResponse,SuccessViewModel<any>>'),
}