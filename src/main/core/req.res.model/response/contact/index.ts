

export class ContactResponse {
    name : string='';
    number : string='';
}

export class ContactDeleteResponse{
    isDeleted : boolean=false;
}

export class ContactListResponse{
    contacts     : ContactResponse[]=[];
    next     : number = -1;
    prev     : number = -1;
    page         : number = 0;
    limit        : number=0;
}