import { Contact } from "@core/domain/entity";
import { IQuery } from "@core/domain/query.builder";


export default interface IContactRepository{
    create(contact:Contact):Promise<Contact>
    get(number:string) : Promise<Contact | null>
    getAll(query : IQuery) : Promise<Contact[]>
    edit(contact:Contact)  : Promise<Contact>
    delete(number:string)  : Promise<boolean>
}