
import { IOContainer } from '@infrastructure/ioc';
import {Router} from 'express'
import { TYPE } from '@infrastructure/di';
import { ContactController } from '@adapter/controller/contact';

const router = Router()

const controller = IOContainer.get<ContactController>(TYPE.CONTROLLER.CONTACT_CREATE);


router.post('/',controller.create.bind(controller));
router.get('/:number',controller.read.bind(controller));
router.get('/',controller.readAll.bind(controller));
router.put('/:number',controller.edit.bind(controller));
router.delete('/:number',controller.delete.bind(controller));

export default router;