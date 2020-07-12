import { SignupResponse } from "@core/req.res.model/response/signup";
import { IPresenter } from "@core/io.port";
import { injectable } from "@core/di";
import { ViewModel, SuccessViewModel } from "@adapter/viewmodel";
import { RESPONSE_STATUS, HTTP_CODE } from "..";

@injectable()
export default class DirectSignupPresenter implements IPresenter<SignupResponse,SuccessViewModel<any>>{
    present(response: SignupResponse) {
        let model : any = {}
        //model.expireIn = response.expireIn;
        model.isAvailable = response.isUsernameAvailable;
        if(model.isAvailable){
            model.accessToken = response.accessToken;
            model.isAvailable = response.isUsernameAvailable;
        }
        let viewModel = new SuccessViewModel(model,RESPONSE_STATUS.SUCCESS,HTTP_CODE.OK);
        return viewModel;
    }
   
    
}