import { UploadResponse } from '@core/req.res.model/response/upload';
import { IMapper } from '@core/mapper';
import { File } from '@core/domain/entity/file';
import { injectable } from '@core/di';

@injectable()
export default class UploadReponseMapper implements IMapper<File,UploadResponse>{
    map(param: File): UploadResponse {
        let response = new UploadResponse(param.url);
        return response;
    }
}