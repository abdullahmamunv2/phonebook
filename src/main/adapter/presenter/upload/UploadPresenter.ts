import { UploadResponse } from '@core/req.res.model/response/upload';
import { IPresenter } from '@core/io.port/output/IPresenter';
import { SuccessViewModel } from '@adapter/viewmodel';
import { injectable } from '@core/di';
import { RESPONSE_STATUS, HTTP_CODE } from '..';

@injectable()
export default class UploadPresenter implements IPresenter<UploadResponse,SuccessViewModel<any>>{
    present(response: UploadResponse): SuccessViewModel<any> {
        let model : any = {
            url : response.url
        }
        let viewModel = new SuccessViewModel(model,RESPONSE_STATUS.SUCCESS,HTTP_CODE.OK);
        return viewModel;
    }

}