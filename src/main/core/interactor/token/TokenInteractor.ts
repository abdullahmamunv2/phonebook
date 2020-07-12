import { TokenRequest } from "@core/req.res.model/request/token";
import { TokenResponse } from "@core/req.res.model/response/token";
import { Interactor } from "@core/io.port";
import { Request } from "@core/req.res.model";
import { ITokenEntityGateway } from "@core/domain/entity.gateway/token";
import { inject, injectable, TYPE } from "@core/di";


@injectable()
export default class TokenInteractor implements Interactor<Request<TokenRequest>,TokenResponse>{
    _tokenEntityGateway : ITokenEntityGateway;
    constructor(
        @inject(TYPE.ENTITY_GATEWAY.TOKEN) tokenEntityGateway : ITokenEntityGateway
    ){
        this._tokenEntityGateway  = tokenEntityGateway;
    }
    async execute(request: Request<TokenRequest>): Promise<TokenResponse> {
        let body  = request.getBody();
        let token = await this._tokenEntityGateway.generate(body.referenceId);
        let response = new TokenResponse();
        response.accessToken = token.accessToken;
        response.expireIn    = token.expireIn;
        return response;
    }
    
}