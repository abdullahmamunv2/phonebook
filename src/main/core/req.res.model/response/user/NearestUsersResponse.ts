import NearestUserReponse from "./NearestUserReponse";


export default class NearestUsersResponse{
    users : NearestUserReponse[] = []
    page     : number = 0
    previous : number= -1;
    next     : number=0;
    limit    : number=100;
    total    : number = 0;
}