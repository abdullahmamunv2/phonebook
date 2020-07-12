import { BaseController } from "..";
import { Interactor, IPresenter } from "@core/io.port";
import { Request } from "@core/req.res.model";
import { UploadRequest } from "@core/req.res.model/request/upload";
import { JwtAuthRequest } from "@core/authorization/req.res.model/jwt";
import { UploadResponse } from "@core/req.res.model/response/upload";
import { injectable, inject } from "@core/di";
import { TYPE } from "@adapter/di";
import { ErrorResponse, ApplicationError } from "@core/errors";
import { ErrorViewModel, SuccessViewModel } from "@adapter/viewmodel";

@injectable()
export default class UploadController extends BaseController {
    _interactor : Interactor<Request<UploadRequest,JwtAuthRequest>,UploadResponse>
    _presenter  : IPresenter<UploadResponse,SuccessViewModel<any>>
    _errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    constructor(
        @inject(TYPE.INTERACTOR.UPLOAD)
        interactor : Interactor<Request<UploadRequest,JwtAuthRequest>,UploadResponse>,

        @inject(TYPE.PRESENTER.UPLOAD)
        presenter  : IPresenter<UploadResponse,SuccessViewModel<any>>,

        @inject(TYPE.PRESENTER.ERROR)
        errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    ){
        super();
        this._interactor = interactor;
        this._presenter = presenter;
        this._errorPresenter = errorPresenter;
    }
    async upload(req:any,res:any){
        let uploadRequest = new UploadRequest();
        let file = req.files.file;
        if(file){
            uploadRequest.file      = file;
            uploadRequest.mimeType  = file.mimetype;
            uploadRequest.extension = file.name.substr(file.name.lastIndexOf('.'));
            uploadRequest.encoding  = file.encoding;
            uploadRequest.size      = file.size;
        }

        let jwtHeaderRequest = new JwtAuthRequest();
        
        jwtHeaderRequest._token = req.token;
        let request = new Request(uploadRequest,jwtHeaderRequest);
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