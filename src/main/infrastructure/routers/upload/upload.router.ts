import { IOContainer } from '@infrastructure/ioc';
import {Router} from 'express'
import { TYPE } from '@infrastructure/di';
import { UploadController } from '@adapter/controller/upload';
import fileUpload from 'express-fileupload'
import { UploadConfig } from '@infrastructure/Irepostiory/config';
import {FileSizeLimitter} from '@infrastructure/routers/middleware'
const router = Router()

const controller = IOContainer.get<UploadController>(TYPE.CONTROLLER.UPLOAD)
const uploadConfig = IOContainer.get<UploadConfig>(TYPE.CONFIG.UPLOAD);
const options = {
    useTempFiles : true,
    tempFileDir : uploadConfig.tempDir,
    abortOnLimit : true,
    createParentPath : true
}

router.post('/',fileUpload(options),controller.upload.bind(controller));


export default router;