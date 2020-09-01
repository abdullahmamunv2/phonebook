import { Contact, IEntityGatewayErrorParser, IQuery } from "@core/domain";
import IContactEntityGateway from "@core/domain/entity.gateway/contact";
import { inject, injectable } from "@core/di";
import IContactRepository from "@infrastructure/Irepostiory/contact";
import { TYPE } from "@infrastructure/di";
import { ErrorResponse,EntityGatewayError, ERROR_TYPE } from "@core/errors";

@injectable()
export default class ContactEntityGateway implements IContactEntityGateway{
    _contactRepository : IContactRepository;
    _errorParser : IEntityGatewayErrorParser
    constructor(
        @inject(TYPE.REPOSITORY.CONTACT)
        contactRepository : IContactRepository,
        @inject(TYPE.DATABASE.ERROR_PARSER)
        errorParser : IEntityGatewayErrorParser
    ){
        this._contactRepository = contactRepository;
        this._errorParser = errorParser;
    }
    async create(contact: Contact): Promise<Contact> {
        try{
            let contactInfo = await this._contactRepository.get(contact.number);
            if(!contactInfo){
                await this._contactRepository.create(contact);
                return contact;
            }
            else{
                let errors = [new EntityGatewayError('CONTACT_ALREADY_EXISTS')];
                let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.CONFLICT,errors);
                return Promise.reject(errorResponse);
            }
        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }
    async get(number: string): Promise<Contact> {

        try{
            let contactInfo = await this._contactRepository.get(number);
            if(contactInfo){
                return contactInfo;
            }
            else{
                let errors = [new EntityGatewayError('NOT_DATE_FOUND')];
                let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.NO_DATA_FOUND,errors);
                return Promise.reject(errorResponse);
            }
        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }
    async getAll(query: IQuery): Promise<Contact[]> {
        try{
            let contacts = await this._contactRepository.getAll(query);
            if(contacts){
                return contacts;
            }
            else{
                return [];
            }
        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }
    async edit(contact: Contact): Promise<Contact> {
        try{
            let contactInfo = await this._contactRepository.get(contact.number);
            if(contactInfo){
                return this._contactRepository.edit(contact)
            }
            else{
                let errors = [new EntityGatewayError('NOT_DATE_FOUND')];
                let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.NO_DATA_FOUND,errors);
                return Promise.reject(errorResponse);
            }

        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }
    async delete(number: string): Promise<boolean> {
        try{
            this._contactRepository.delete(number);
            return true;

        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }

}