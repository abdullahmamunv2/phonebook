import { Interactor } from "@core/io.port";
import {ContactRequest} from "@core/req.res.model/request/contact";
import {ContactDeleteResponse} from "@core/req.res.model/response/contact";
import { injectable,inject, TYPE } from "@core/di";
import { IValidator } from "@core/validator";
import IContactEntityGateway from "@core/domain/entity.gateway/contact";
import { Contact } from "@core/domain";



@injectable()
export default class ContactDeleteInteractor implements Interactor<string,ContactDeleteResponse>{
    _contactEntityGateway : IContactEntityGateway
    //_validator            : IValidator<ContactRequest>
    constructor(
       // @inject(TYPE.VALIDATOR.CONTACT_CREATE)
       // validator        : IValidator<ContactRequest>,

        @inject(TYPE.ENTITY_GATEWAY.CONTACT)
        contactEntityGateway : IContactEntityGateway,
    ){
       // this._validator = validator;
        this._contactEntityGateway  = contactEntityGateway;
    }
    async execute(request: string): Promise<ContactDeleteResponse> {
        let contact     = await this._contactEntityGateway.delete(request);
        let contactResponse = new ContactDeleteResponse();
        contactResponse.isDeleted = contact;
        return contactResponse;
    }

}