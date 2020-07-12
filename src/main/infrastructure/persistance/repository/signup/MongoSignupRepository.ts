import {ISignupRepository} from "@infrastructure/Irepostiory";
import { DirectSignup } from "@core/domain/entity/signup";
import { injectable, inject } from "@core/di";
import { TYPE } from "@infrastructure/di";
import { MongoDBManager } from "@infrastructure/persistance/dbmanager/mongo";
import {CommenterModel}  from '@infrastructure/persistance/dbmanager/mongo/models/user'
import { ILogger } from "@core/logger";
import { VarChar, RequestError, Int, SmallInt, Bit } from "mssql";
import { BaseRepository } from "..";

@injectable()
export  default class MongoSignupRepository extends BaseRepository implements ISignupRepository{
    _pool : MongoDBManager;
    
    constructor(
        @inject(TYPE.DATABASE.MONGO_MANAGER) pool : MongoDBManager,
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger
    ){
        super(logger);
        this._pool = pool;
    }
    async readByUsername(username: string): Promise<DirectSignup | undefined> {
        try{
            let document = await CommenterModel.findOne({username : username});
            if(!document)
                return;
            let signupInfo = new DirectSignup(document.username,document.password);
            signupInfo.type      = document.type;
            signupInfo.referrer  = document.referrer;
            return signupInfo;

        }catch(err){
            this._logger.error(`MongoSignupRepository::readByUsername - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    async create(signupInfo: DirectSignup): Promise<DirectSignup> {
        let availableUser = await this.readByUsername(signupInfo.username);
        if(availableUser){
            availableUser.isUsernameAvailable = false;
            return availableUser;
        }

        try{
            let document = await CommenterModel.create(signupInfo);
            signupInfo.userId = document._id;
            signupInfo.isUsernameAvailable = true;
            return signupInfo;

        }catch(err){
            this._logger.error(`MongoSignupRepository::create - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }    
    async read(referenceId: string): Promise<DirectSignup|undefined> {
        try{
            let document = await CommenterModel.findOne({referenceId : referenceId});
            if(!document)
                return;
            let signupInfo = new DirectSignup(document.username,document.password);
            signupInfo.userId = document._id;
            //signupInfo.referenceId = document.referenceId;
            //signupInfo.isExpired = document.isExpired;
            signupInfo.type      = document.type;
            signupInfo.referrer  = document.referrer;
            return signupInfo;

        }catch(err){
            this._logger.error(`MongoSignupRepository::read - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }

    async setExpire(referenceId:string,status:boolean):Promise<boolean>{
        try{
            let document = await CommenterModel.updateOne({referenceId : referenceId},{$set : { isExpired : status}});
            return true;

        }catch(err){
            this._logger.error(`MongoSignupRepository::setExpire - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }

    
}