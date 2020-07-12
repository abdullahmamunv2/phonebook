import { TYPE } from '@infrastructure/di';
import { inject, injectable } from '@core/di';
import { BaseRepository } from '..';
import { IUploadRepository } from '@infrastructure/Irepostiory';
import { File } from '@core/domain/entity/file';
import { EntityGatewayError, ErrorResponse, ERROR_TYPE } from '@core/errors';
import { UploadConfig } from '@infrastructure/Irepostiory/config';
import { ILogger } from '@core/logger';
import uuidv4 from 'uuid/v4'

@injectable()
export default class UploadRepository extends BaseRepository implements IUploadRepository{
    _uploadConfig : UploadConfig;
    constructor(
        @inject(TYPE.CONFIG.UPLOAD) uploadConfig : UploadConfig,
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger
    ){
        super(logger);
        this._uploadConfig = uploadConfig;
    }
    async upload(file: File): Promise<File> {
        this._logger.debug(file);
        if(file.raw){
            let fileName = uuidv4()+file.extension;
            let filePath = `${this._uploadConfig.dir}/${file.userId}/${fileName}`;
            this._logger.debug(filePath);
            try{
                await file.raw.mv(filePath);
                file.url = `${this._uploadConfig.baseUrl}/${file.userId}/${fileName}`
                return file;
            }catch(err){
                this._logger.error(`UploadRepository::upload - Error Code : ${err.code} - Error Message : ${err.message}`);
                let errors = [new EntityGatewayError('UNABLE_TO_SAVE_FILE')];
                let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
                return Promise.reject(errorResponse);
            }
        }
        else{
            let errors = [new EntityGatewayError('FILE_NOT_FOUND')];
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }

} 