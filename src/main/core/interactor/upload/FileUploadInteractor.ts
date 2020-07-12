import { IMapper } from '@core/mapper';
import { IJwtAuthorization } from '@core/authorization/auth-type';
import { Interactor } from '@core/io.port';
import { UploadRequest } from '@core/req.res.model/request/upload';
import { UploadResponse } from '@core/req.res.model/response/upload';
import { Request } from '@core/req.res.model';
import { JwtAuthRequest } from '@core/authorization/req.res.model/jwt';
import { inject, TYPE, injectable } from '@core/di';
import { IUploadEntityGateway } from '@core/domain/entity.gateway/upload';
import { File } from '@core/domain/entity/file';


@injectable()
export default class FileUploadInteractor implements Interactor<Request<UploadRequest,JwtAuthRequest>,UploadResponse>{
    _authorizer : IJwtAuthorization;
    _uploadEntityGateway : IUploadEntityGateway;
    _requestMapper : IMapper<UploadRequest,File>;
    _responseMapper : IMapper<File,UploadResponse>;
    constructor(
        @inject(TYPE.AUTH.TOKEN) authorizer : IJwtAuthorization,
        @inject(TYPE.MAPPER.REQUEST.UPLOAD) requestMapper  : IMapper<UploadRequest,File>,
        @inject(TYPE.MAPPER.RESPONSE.UPLOAD) responseMapper : IMapper<File,UploadResponse>,
        @inject(TYPE.ENTITY_GATEWAY.UPLOAD) uploadEntityGateway : IUploadEntityGateway
    ){
        this._authorizer = authorizer;
        this._requestMapper = requestMapper;
        this._responseMapper = responseMapper;
        this._uploadEntityGateway = uploadEntityGateway;
    }
    async execute(request: Request<UploadRequest, JwtAuthRequest>): Promise<UploadResponse> {
        let header = request.getHeader();
        let body   = request.getBody();
        console.log(body);
        if(!header){
            header = new JwtAuthRequest();
        }
        let tokenInfo = await this._authorizer.authorize(header,[]);
        let file   = await this._requestMapper.map(body);
        file.userId = tokenInfo.userId;
        file = await this._uploadEntityGateway.upload(file);
        let response = await this._responseMapper.map(file);
        return response;
    }
    
}