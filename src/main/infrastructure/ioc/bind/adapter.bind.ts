import { Request } from '@core/req.res.model';
import { Interactor, IPresenter } from '@core/io.port';
import IOContainer from '@infrastructure/ioc/ioc.instance';
import { TYPE } from '@adapter/di';
import { ErrorResponse, ApplicationError } from '@core/errors';
import { ErrorPresenter } from '@adapter/presenter';
import { ErrorViewModel, SuccessViewModel } from '@adapter/viewmodel';
import { SignupResponse, GoogleSignupResponse } from '@core/req.res.model/response/signup';
import { DirectSignupPresenter } from '@adapter/presenter/signup';
import { DirectSignupRequest } from '@core/req.res.model/request/signup';
import { DirectSignupInteractor } from '@core/interactor/signup';

import { TokenResponse } from '@core/req.res.model/response/token';
import { DirectSigninInteractor} from '@core/interactor/signin';

import { FileUploadInteractor } from '@core/interactor/upload';
import { UploadRequest } from '@core/req.res.model/request/upload';
import { JwtAuthRequest } from '@core/authorization/req.res.model/jwt';
import { UploadResponse } from '@core/req.res.model/response/upload';
import { UploadPresenter } from '@adapter/presenter/upload';
import { ProfileResponse } from '@core/req.res.model/response/profile';
import { DirectSigninRequest} from '@core/req.res.model/request/signin';




/**
 * Interactor bindings
 */

 IOContainer.bind<Interactor<DirectSigninRequest,TokenResponse>>(TYPE.INTERACTOR.DIRECT_SIGN_IN).to(DirectSigninInteractor).inSingletonScope()
 IOContainer.bind<Interactor<Request<DirectSignupRequest>,SignupResponse>>(TYPE.INTERACTOR.DIRECT_SIGNUP).to(DirectSignupInteractor).inSingletonScope()
 IOContainer.bind<Interactor<Request<UploadRequest,JwtAuthRequest>,UploadResponse>>(TYPE.INTERACTOR.UPLOAD).to(FileUploadInteractor).inSingletonScope();
 /**
 * Presenter bindings  
 */

IOContainer.bind<IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>>(TYPE.PRESENTER.ERROR).to(ErrorPresenter).inSingletonScope();
IOContainer.bind<IPresenter<SignupResponse,SuccessViewModel<any>>>(TYPE.PRESENTER.DIRECT_SIGNUP).to(DirectSignupPresenter).inSingletonScope()
IOContainer.bind<IPresenter<UploadResponse,SuccessViewModel<any>>>(TYPE.PRESENTER.UPLOAD).to(UploadPresenter).inSingletonScope()
