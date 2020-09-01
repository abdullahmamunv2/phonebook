import {Router} from 'express'
import {BearerToken} from '@infrastructure/routers/middleware'

import ContactRouter from '@infrastructure/routers/contact'
const router = Router();


router.use('/contacts',ContactRouter);


export default router;