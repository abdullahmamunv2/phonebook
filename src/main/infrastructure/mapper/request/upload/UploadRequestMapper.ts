import { UploadRequest } from "@core/req.res.model/request/upload";
import { IMapper } from "@core/mapper";
import { File } from "@core/domain/entity/file";
import { injectable } from "@core/di";


@injectable()
export default class UploadRequestMapper implements IMapper<UploadRequest,File>{
    map(param: UploadRequest): File {
        return  new File(param.file,param.extension,param.size);
    }
}