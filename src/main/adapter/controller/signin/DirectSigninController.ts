import { TokenResponse } from '@core/req.res.model/response/token';
import { GoogleSignupResponse } from '@core/req.res.model/response/signup';
import { injectable, inject } from "@core/di";
import { DirectSignupRequest } from "@core/req.res.model/request/signup";
import { Interactor, IPresenter } from '@core/io.port';
import { ErrorResponse, ApplicationError } from '@core/errors';
import { ErrorViewModel, SuccessViewModel } from '@adapter/viewmodel';
import { TYPE } from '@adapter/di';
import { DirectSigninRequest } from '@core/req.res.model/request/signin';


@injectable()
export default class DirectSigninController {
    _interactor : Interactor<DirectSignupRequest,TokenResponse>
    //_presenter  : IPresenter<TokenResponse,SuccessViewModel<any>>
    _errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>

    constructor(
        @inject(TYPE.INTERACTOR.DIRECT_SIGN_IN) 
        interactor : Interactor<DirectSignupRequest,TokenResponse>,

        /*@inject(TYPE.PRESENTER.OTP_VERIFY)
        presenter  : IPresenter<TokenResponse,SuccessViewModel<any>>,*/

        @inject(TYPE.PRESENTER.ERROR)
        errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    ){
        this._interactor = interactor;
        //this._presenter  = presenter;
        this._errorPresenter = errorPresenter;
    }

    async signin(req:any,res:any){
        let body =  req.body;
        let username = body.username;
        let password = body.password;
        let channel  = body.channel;
        let deviceId = body.deviceId;
        let deviceToken = body.token;
        
        let request = new DirectSigninRequest(username,password);
        request.deviceId = deviceId;
        request.channel  = channel;
        request.token    = deviceToken;
        try{
            let signinResponse = await this._interactor.execute(request);
            //let viewModel   = this._presenter.present(signupResponse);
            //let statusCode = viewModel.getHttpStatusCode();
            //let response =  viewModel.getResponse();
            res.status(200).json(
                {
                    status : "SUCCESS",
                    data : signinResponse
                }
            );

        }catch(err){
            let error = this._errorPresenter.present(err);
            let statusCode = error.getHttpStatusCode();
            let response =  error.getResponse();
            res.status(statusCode).json(response);
            
        }
    }
}