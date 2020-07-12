import {Router} from 'express'
import {direcSignupRouter} from '../signup'
import signInRouter from '../signin'
import {uploadRouter}  from '../upload';
import {BearerToken} from '@infrastructure/routers/middleware'

const router = Router();

router.use('/signup',direcSignupRouter);
router.use('/signin',signInRouter);
//push
router.use(BearerToken);
router.use('/upload',uploadRouter);

export default router;