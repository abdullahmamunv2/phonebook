import { File } from "@core/domain/entity/file";


export default interface IUploadEntityGateway {
    upload(file:File):Promise<File>
}