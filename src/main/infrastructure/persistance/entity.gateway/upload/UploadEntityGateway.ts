import { IUploadEntityGateway } from "@core/domain/entity.gateway/upload";
import { File } from "@core/domain/entity/file";
import { injectable,inject } from "@core/di";
import { IUploadRepository } from "@infrastructure/Irepostiory";
import { TYPE } from "@infrastructure/di";

@injectable()
export default class UploadEntityGateway implements IUploadEntityGateway{
    _uploadRepository : IUploadRepository;
    constructor(
        @inject(TYPE.REPOSITORY.UPLOAD) uploadRepository : IUploadRepository
    ){
        this._uploadRepository = uploadRepository;
    }
    async upload(file: File): Promise<File> {
        return this._uploadRepository.upload(file);
    }
}