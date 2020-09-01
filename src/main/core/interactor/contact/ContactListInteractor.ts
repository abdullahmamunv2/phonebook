import { Interactor } from "@core/io.port";
import {ContactRequest, PaginationRequest} from "@core/req.res.model/request/contact";
import {ContactListResponse, ContactResponse} from "@core/req.res.model/response/contact";
import { injectable,inject, TYPE } from "@core/di";
import { IValidator } from "@core/validator";
import IContactEntityGateway from "@core/domain/entity.gateway/contact";
import { Contact, QueryBuilder } from "@core/domain";



@injectable()
export default class ContactListInteractor implements Interactor<PaginationRequest,ContactListResponse>{
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
    async execute(request: PaginationRequest): Promise<ContactListResponse> {
        let query = new QueryBuilder().limit(request.limit).page(request.page).build();
        let contacts     = await this._contactEntityGateway.getAll(query);
        let contactResponse = new ContactListResponse();
        if(contacts.length == request.limit){
            contactResponse.next = request.page+1;
        }
        if(request.page!=0)
            contactResponse.prev = request.page-1;
        
        contactResponse.page = request.page;
        contactResponse.limit   = request.limit;
        contactResponse.contacts = contacts;
        return contactResponse;
    }

}