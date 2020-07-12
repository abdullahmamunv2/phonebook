import { DirectSigninController } from '@adapter/controller/signin';
import { IOContainer } from '@infrastructure/ioc';
import {Router} from 'express'
import { TYPE } from '@infrastructure/di';

const router = Router()

const controller = IOContainer.get<DirectSigninController>(TYPE.CONTROLLER.DIRECT_SIGN_IN)


router.post('/direct',controller.signin.bind(controller));


export default router;