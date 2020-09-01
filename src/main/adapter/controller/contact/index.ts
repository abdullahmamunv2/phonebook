import { Interactor, IPresenter } from "@core/io.port";
import { ContactRequest, PaginationRequest } from "@core/req.res.model/request/contact";
import { ContactDeleteResponse, ContactListResponse, ContactResponse } from "@core/req.res.model/response/contact";
import { inject, injectable} from "@core/di";
import BaseController from "@adapter/controller/base.controller";
import { ErrorViewModel, SuccessViewModel } from "@adapter/viewmodel";
import { ApplicationError, ErrorResponse } from "@core/errors";
import { TYPE } from "@adapter/di";


@injectable()
export class ContactController extends BaseController{

    _interactor : Interactor<ContactRequest,ContactResponse>
    _readInteractor : Interactor<string,ContactResponse>
    _editInteracotr : Interactor<ContactRequest,ContactResponse>
    _deleteInteractor : Interactor<string,ContactDeleteResponse>
    _listInteractor : Interactor<PaginationRequest,ContactListResponse>

    _presenter  : IPresenter<ContactResponse,SuccessViewModel<any>>
    _deletePresenter : IPresenter<ContactDeleteResponse,SuccessViewModel<any>>
    _listPresenter : IPresenter<ContactListResponse,SuccessViewModel<any>>

    _errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    constructor(
        @inject(TYPE.INTERACTOR.CONTACT_CREATE) 
        interactor : Interactor<ContactRequest,ContactResponse>,
        @inject(TYPE.INTERACTOR.CONTACT_EDIT) 
        editInteractor : Interactor<ContactRequest,ContactResponse>,
        @inject(TYPE.INTERACTOR.CONTACT_READ) 
        readInteractor : Interactor<string,ContactResponse>,
        @inject(TYPE.INTERACTOR.CONTACT_DELETE) 
        deleteInteractor : Interactor<string,ContactDeleteResponse>,
        @inject(TYPE.INTERACTOR.CONTACT_LIST) 
        listInteractor : Interactor<PaginationRequest,ContactListResponse>,


        @inject(TYPE.PRESENTER.CONTACT_CREATE)
        presenter  : IPresenter<ContactResponse,SuccessViewModel<any>>,
        @inject(TYPE.PRESENTER.CONTACT_DELETE)
        deletePresenter  : IPresenter<ContactDeleteResponse,SuccessViewModel<any>>,
        @inject(TYPE.PRESENTER.CONTACT_LIST)
        listPresenter  : IPresenter<ContactListResponse,SuccessViewModel<any>>,
        @inject(TYPE.PRESENTER.ERROR)
        errorPresenter : IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>
    ){
        super();
        this._interactor = interactor;
        this._editInteracotr = editInteractor;
        this._readInteractor = readInteractor;
        this._deleteInteractor = deleteInteractor;
        this._listInteractor = listInteractor;

        this._presenter  = presenter;
        this._deletePresenter = deletePresenter;
        this._listPresenter   = listPresenter;
        this._errorPresenter = errorPresenter;
    }

    async create(req:any,res:any){
        let body:any  = req.body;
        let contactRequest = new ContactRequest();
        contactRequest.name = body.name;
        contactRequest.number = body.number;
        try{
            let contactCreateResponse = await this._interactor.execute(contactRequest);
            let viewModel   = this._presenter.present(contactCreateResponse);
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

    async read(req:any,res:any){
        let params:any  = req.params;
        let number = params.number;
       
        try{
            let contactResponse = await this._readInteractor.execute(number);
            let viewModel   = this._presenter.present(contactResponse);
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
    async edit(req:any,res:any){
        let body:any  = req.body;
        let params:any  = req.params;
        let number = params.number;
        let contactRequest = new ContactRequest();
        contactRequest.name = body.name;
        contactRequest.number = number;
        try{
            let contactResponse = await this._editInteracotr.execute(contactRequest);
            let viewModel   = this._presenter.present(contactResponse);
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
    async delete(req:any,res:any){
        let params:any  = req.params;
        let number = params.number;
        try{
            let contactResponse = await this._deleteInteractor.execute(number);
            let viewModel   = this._deletePresenter.present(contactResponse);
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

    async readAll(req:any,res:any){
        let query:any  = req.query;
        let page = query.page;
        let limit = query.limit;
        let request = new PaginationRequest();
        if(page)
            request.page = page | 0;
        if(limit)
            request.limit=limit | 0;
        try{
            let contactResponse = await this._listInteractor.execute(request);
            let viewModel   = this._listPresenter.present(contactResponse);
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