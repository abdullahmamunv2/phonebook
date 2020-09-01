import { Request } from '@core/req.res.model';
import { Interactor, IPresenter } from '@core/io.port';
import IOContainer from '@infrastructure/ioc/ioc.instance';
import { TYPE } from '@adapter/di';
import { ErrorResponse, ApplicationError } from '@core/errors';
import { ErrorPresenter } from '@adapter/presenter';
import { ErrorViewModel, SuccessViewModel } from '@adapter/viewmodel';

import { ContactRequest, PaginationRequest } from '@core/req.res.model/request/contact';
import { ContactDeleteResponse, ContactListResponse, ContactResponse } from '@core/req.res.model/response/contact';
import ContactCreateInteractor from '@core/interactor/contact/ContactCreateInteractor';
import { ContactCreatePresenter, ContactDeletePresenter, ContactListPresenter } from '@adapter/presenter/contact';
import ContactReadInteractor from '@core/interactor/contact/ContactReadInteractor';
import { ContactDeleteInteractor, ContactEditInteractor } from '@core/interactor/contact';
import ContactListInteractor from '@core/interactor/contact/ContactListInteractor';




/**
 * Interactor bindings
 */
IOContainer.bind<Interactor<ContactRequest,ContactResponse>>(TYPE.INTERACTOR.CONTACT_CREATE).to(ContactCreateInteractor);
IOContainer.bind<Interactor<string,ContactResponse>>(TYPE.INTERACTOR.CONTACT_READ).to(ContactReadInteractor);
IOContainer.bind<Interactor<ContactRequest,ContactResponse>>(TYPE.INTERACTOR.CONTACT_EDIT).to(ContactEditInteractor);
IOContainer.bind<Interactor<string,ContactDeleteResponse>>(TYPE.INTERACTOR.CONTACT_DELETE).to(ContactDeleteInteractor);
IOContainer.bind<Interactor<PaginationRequest,ContactListResponse>>(TYPE.INTERACTOR.CONTACT_LIST).to(ContactListInteractor);

 /**
 * Presenter bindings  
 */
IOContainer.bind<IPresenter<ErrorResponse<ApplicationError>,ErrorViewModel<any>>>(TYPE.PRESENTER.ERROR).to(ErrorPresenter).inSingletonScope();
IOContainer.bind<IPresenter<ContactResponse,SuccessViewModel<any>>>(TYPE.PRESENTER.CONTACT_CREATE).to(ContactCreatePresenter).inSingletonScope()
IOContainer.bind<IPresenter<ContactDeleteResponse,SuccessViewModel<any>>>(TYPE.PRESENTER.CONTACT_DELETE).to(ContactDeletePresenter).inSingletonScope()
IOContainer.bind<IPresenter<ContactListResponse,SuccessViewModel<any>>>(TYPE.PRESENTER.CONTACT_LIST).to(ContactListPresenter).inSingletonScope()
