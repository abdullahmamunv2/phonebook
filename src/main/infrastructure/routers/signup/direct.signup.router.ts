import { IOContainer } from '@infrastructure/ioc';
import {Router} from 'express'
import { TYPE } from '@infrastructure/di';
import { DirectSignupController } from '@adapter/controller/singup';

const router = Router()

const controller = IOContainer.get<DirectSignupController>(TYPE.CONTROLLER.DIRECT_SIGNUP)


router.post('/direct',controller.signup.bind(controller));


export default router;