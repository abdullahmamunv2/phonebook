import { IPresenter } from "@core/io.port";
import { ContactDeleteResponse, ContactListResponse, ContactResponse } from "@core/req.res.model/response/contact";
import { injectable } from "@core/di";
import { SuccessViewModel } from "@adapter/viewmodel";
import { HTTP_CODE, RESPONSE_STATUS } from "..";

@injectable()
export class ContactCreatePresenter  implements IPresenter<ContactResponse,SuccessViewModel<any>>{
    present(response: ContactResponse): SuccessViewModel<any> {
        let model : any = {}
        model.name = response.name;
        model.number = response.number;
        let viewModel = new SuccessViewModel(model,RESPONSE_STATUS.SUCCESS,HTTP_CODE.OK);
        return viewModel;
    }

}

@injectable()
export class ContactDeletePresenter implements IPresenter<ContactDeleteResponse,SuccessViewModel<any>>{
    present(response: ContactDeleteResponse): SuccessViewModel<any> {
        let model : any = {}
        model.isDeleted = response.isDeleted;
        let viewModel = new SuccessViewModel(model,RESPONSE_STATUS.SUCCESS,HTTP_CODE.OK);
        return viewModel;
    }

}

@injectable()
export class ContactListPresenter implements IPresenter<ContactListResponse,SuccessViewModel<any>>{
    present(response: ContactListResponse): SuccessViewModel<any> {
        let viewModel = new SuccessViewModel(response,RESPONSE_STATUS.SUCCESS,HTTP_CODE.OK);
        return viewModel;
    }

}