import { Interactor, IPresenter } from '@core/io.port';
import { Request } from '@core/req.res.model';
import { DirectSignupRequest } from '@core/req.res.model/request/signup';
import { SignupResponse } from '@core/req.res.model/response/signup';
import { inject, injectable } from '@core/di';
import { TYPE } from '@adapter/di';
import { SuccessViewModel, ErrorViewModel } from '@adapter/viewmodel';
import { ErrorResponse, ApplicationError } from '@core/errors';

@injectable()
export default class DirectSignupController {
    _interactor : Interactor<Request<DirectSignupRequest>,SignupResponse>
    _presenter  : IPresenter<SignupResponse,SuccessViewModel<any>>
    _errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    constructor(
        @inject(TYPE.INTERACTOR.DIRECT_SIGNUP) 
        interactor : Interactor<Request<DirectSignupRequest>,SignupResponse>,

        @inject(TYPE.PRESENTER.DIRECT_SIGNUP)
        presenter  : IPresenter<SignupResponse,SuccessViewModel<any>>,

        @inject(TYPE.PRESENTER.ERROR)
        errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    ){
        this._interactor = interactor;
        this._presenter  = presenter;
        this._errorPresenter = errorPresenter;
    }
    async signup(req:any,res:any){
        let body:any  = req.body;
        let directSignupRequest = new DirectSignupRequest(body.username,body.password);
        let request     = new Request(directSignupRequest);
        try{
            let signupResponse = await this._interactor.execute(request);
            let viewModel   = this._presenter.present(signupResponse);
            let statusCode = viewModel.getHttpStatusCode();
            let response =  viewModel.getResponse();
            res.status(statusCode).json(response);

        }catch(err){
            let error = this._errorPresenter.present(err);
            let statusCode = error.getHttpStatusCode();
            let response =  error.getResponse();
            res.status(statusCode).json(response);
            
        }
    }
}