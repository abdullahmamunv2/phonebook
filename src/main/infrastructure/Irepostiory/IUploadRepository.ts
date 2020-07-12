import { File } from "@core/domain/entity/file";


export default interface IUploadRepository {
    upload(file:File):Promise<File>
}