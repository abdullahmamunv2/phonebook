import { Interactor } from "@core/io.port";
import {ContactRequest} from "@core/req.res.model/request/contact";
import {ContactResponse} from "@core/req.res.model/response/contact";
import { injectable,inject, TYPE } from "@core/di";
import { IValidator } from "@core/validator";
import IContactEntityGateway from "@core/domain/entity.gateway/contact";
import { Contact } from "@core/domain";



@injectable()
export default class ContactCreateInteractor implements Interactor<ContactRequest,ContactResponse>{
    _contactEntityGateway : IContactEntityGateway
    _validator            : IValidator<ContactRequest>
    constructor(
        @inject(TYPE.VALIDATOR.CONTACT_CREATE)
        validator        : IValidator<ContactRequest>,

        @inject(TYPE.ENTITY_GATEWAY.CONTACT)
        contactEntityGateway : IContactEntityGateway,
    ){
        this._validator = validator;
        this._contactEntityGateway  = contactEntityGateway;
    }
    async execute(request: ContactRequest): Promise<ContactResponse> {
        request     = await this._validator.validate(request);
        let contact = new Contact(request.number,request.name);
        contact     = await this._contactEntityGateway.create(contact);

        let contactResponse = new ContactResponse();
        contactResponse.number = contact.number;
        contactResponse.name   = contact.name;
        return contactResponse;
    }

}