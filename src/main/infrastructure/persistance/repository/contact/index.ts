import { Contact, IQuery } from "@core/domain";
import IContactRepository from "@infrastructure/Irepostiory/contact";
import { ContactModel } from "@infrastructure/persistance/dbmanager/mongo/models/contact/Contact";
import { inject, injectable } from "@core/di";
import { BaseRepository } from "..";
import { TYPE } from "@infrastructure/di";
import { ILogger } from "@core/logger";

@injectable()
export default class ContactRepository extends BaseRepository implements IContactRepository{
    constructor(
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger,
    ){
        super(logger);
    }

    async create(contact: Contact): Promise<Contact> {

        let doc = new ContactModel({
            name : contact.name,
            number : contact.number
        })

        try{
            doc.save();
            return contact;
        }catch(err){
            this._logger.error(`ContactRepository::create - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    async get(number: string): Promise<Contact | null> {
        try{
            let doc = await ContactModel.findOne({number : number});
            if(doc){
                return new Contact(doc.number,doc.name);
            }
            else
                return null;
        }catch(err){
            this._logger.error(`ContactRepository::get - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    async getAll(query: IQuery): Promise<Contact[]> {
        try{
            let contacts = await ContactModel.find({}).skip(query.page*query.limit).limit(query.page*query.limit + query.limit);
            return contacts.map((contact)=>{
                return new Contact(contact.number,contact.name);
            })
        }catch(err){
            this._logger.error(`ContactRepository::edit - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    async edit(contact: Contact): Promise<Contact> {
        try{
            await ContactModel.updateOne({number : contact.number},{$set:{name : contact.name}});
            return contact;

        }catch(err){
            this._logger.error(`ContactRepository::edit - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    async delete(number: string): Promise<boolean> {
        try{
            let deletedResult = await ContactModel.deleteOne({number : number});
            if(deletedResult.ok){
                return true;
            }
            else{
                return false;
            }
        }catch(err){
            this._logger.error(`ContactRepository::delete - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    
}