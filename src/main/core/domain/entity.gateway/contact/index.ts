import {Contact} from "@core/domain/entity/";
import { IQuery } from "@core/domain/query.builder";


export default interface IContactEntityGateway {
    create(contact:Contact):Promise<Contact>
    get(number:string) : Promise<Contact>
    getAll(query : IQuery) : Promise<Contact[]>
    edit(contact:Contact)  : Promise<Contact>
    delete(number:string)  : Promise<boolean>
}