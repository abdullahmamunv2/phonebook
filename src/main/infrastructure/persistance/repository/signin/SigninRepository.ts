import { ISignupRepository, ISigninRepository } from '@infrastructure/Irepostiory';
import BaseRepository from "../base.repository";
import { Signin} from '@core/domain/entity/signin';
import { inject, injectable } from '@core/di';
import { DatabaseManager } from '@infrastructure/persistance/dbmanager/mssql';
import { ILogger } from '@core/logger';
import { VarChar, SmallInt, RequestError, NVarChar, Int, Bit } from 'mssql';
import { TYPE } from '@infrastructure/di';

@injectable()
export default class SigninRepository extends BaseRepository implements ISigninRepository{
    _pool : DatabaseManager;
    constructor(
        @inject(TYPE.DATABASE.MANAGER) pool : DatabaseManager,
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger,
    ){
        super(logger);
        this._pool = pool;
    }
    async read(userId:number):Promise<Signin|undefined>{
        const query = `SELECT [username],[password],[referrer],[xmpp_jid],[xmpp_password],[xmpp_server_id],[sip_id],[sip_password],[sip_isRegistered],[is_profile_available]
                       FROM login 
                       WHERE id=@userId;`;
        let request = await this._pool.makeRequest();
        request.input('userId',Int,userId);
        try{
            let result  = await request.query(query);
            let affectedRow = result.rowsAffected[0];
            if(affectedRow>0){
                let record = result.recordset[0];
                let referrer = record.referrer;
                let signinInfo = new Signin(record.username,referrer);
                return signinInfo;
            }
            
        }catch(err){
            this._logger.error(`SigninRepository::read - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
    async readByUsername(username: string,referrer:number): Promise<Signin|undefined> {
        const query = `SELECT [id],[username],[password],[referrer],[xmpp_jid],[xmpp_password],[xmpp_server_id],[sip_id],[sip_password],[sip_isRegistered],[is_profile_available]
                       FROM login 
                       WHERE username=@username AND referrer=@referrer;`;
        let request = await this._pool.makeRequest();
        request.input('username',VarChar,username);
        request.input('referrer',SmallInt,referrer);
        try{
            let result  = await request.query(query);
            let affectedRow = result.rowsAffected[0];
            if(affectedRow>0){
                let record = result.recordset[0];
                let referrer = record.referrer;
                let signinInfo = new Signin(record.username,referrer);
                return signinInfo;
            }
            
        }catch(err){
            this._logger.error(`SigninRepository::readByUsername - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }    
    async updateSipStatus(userId:number,status:number):Promise<boolean>{
        
        const query = `UPDATE login
                       SET [sip_isRegistered] = @status
                       WHERE id=@userId;`;
        let request = await this._pool.makeRequest();
        request.input('userId',Int,userId);
        request.input('status',Bit,status);
        try{
            let result  = await request.query(query);
            let affectedRow = result.rowsAffected[0];
            if(affectedRow>0){
                return true;
            }
            else{
                this._logger.error(`SigninRepository::updateSipStatus - affectedRow : ${affectedRow}`);
                return false;
            }
            
        }catch(err){
            this._logger.error(`SigninRepository::updateSipStatus - Error Code : ${err.code} - Error Message : ${err.message}`);
            return false
        }
    }
    async create(signin: Signin): Promise<Signin> {
        
        const query = `INSERT INTO login
                       ([username],[password],[referrer],[xmpp_jid],[xmpp_password],[xmpp_server_id],[sip_id],[sip_password])
                       values(@username,@password,@referrer,@xmpp_jid,@xmpp_password,@xmpp_server_id,@sip_id,@sip_password); SELECT SCOPE_IDENTITY() AS 'Identity';`;
        let request = await this._pool.makeRequest();
        request.input('username',VarChar,signin.username);
        request.input('password',VarChar,signin.password);
        request.input('referrer',SmallInt,signin.referrer);
        try{
            let result  = await request.query(query);
            let affectedRow = result.rowsAffected[0];
            if(affectedRow>0){
                let record   = result.recordset[0];
                signin.id    = record.Identity;
                return signin;
            }
            else{
                this._logger.error(`SigninRepository::create - affectedRow : ${affectedRow}`);
                return Promise.reject(new RequestError('Row Number Equal to zero','EUNKNOWN'));
            }
            
        }catch(err){
            this._logger.error(`SigninRepository::create - Error Code : ${err.code} - Error Message : ${err.message}`);
            return Promise.reject(err);
        }
    }
}