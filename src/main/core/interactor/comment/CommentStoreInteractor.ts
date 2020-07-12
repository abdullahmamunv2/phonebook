import { inject, injectable, TYPE } from "@core/di";
import { Interactor } from "@core/io.port/input";
import { CommentRequest } from "@core/req.res.model/request/comment";
import { CommentResponse } from "@core/req.res.model/response/comment";
import { IValidator } from "@core/validator";


@injectable()
export default class CommentStoreInteractor implements Interactor<CommentRequest,CommentResponse>{
    _validator        : IValidator<CommentRequest>

    constructor(
        @inject(TYPE.VALIDATOR.COMMENT_ADD_VALIDATOR)
        validator        : IValidator<CommentRequest>
    ){
        this._validator = validator;
    }
    execute(request: CommentRequest): Promise<CommentResponse> {
        throw new Error('UNIMPLEMENTED');
    }
    
}