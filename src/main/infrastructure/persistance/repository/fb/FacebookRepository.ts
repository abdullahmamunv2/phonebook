import { IFacebookRepository } from "@infrastructure/Irepostiory";
import { FacebookTokenInfo } from "@core/oauth2.parser/entity";
import { injectable, inject } from "@core/di";
import { TYPE } from "@infrastructure/di";
import { ILogger } from "@core/logger";
import { BaseRepository } from "..";
import axios,{ AxiosInstance} from 'axios';
import HTTP_CODE  from 'http-status-codes';
//import FB, {FacebookApiException} from "fb";

const baseUrl = 'https://graph.facebook.com/';

@injectable()
export default class FacebookRepository extends BaseRepository implements IFacebookRepository{
    
    _http   :AxiosInstance;


    constructor(
        @inject(TYPE.LOGGER.API) logger : ILogger){
        super(logger)
    
        this._http   = axios.create({
            baseURL : baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getInfo(accessToken: string, fbId : string): Promise<FacebookTokenInfo> {

        const _config = {
            params : {
                fields: 'name,birthday,email,gender',
                access_token : accessToken
            }
        }


        try{
            let response = await this._http.get(`/${fbId}`,_config);
            let statusCode = response.status;
            if(statusCode === HTTP_CODE.OK){
                this._logger.info(`FacebookRepository::getinfo - User Signed In Successfully - Request Data : ${fbId}`);
                let data = response.data;
                let userInfo = new FacebookTokenInfo(data.id);
                userInfo.name = data.name;
                userInfo.avatar = baseUrl+fbId+'/picture?type=large';
                if(data.gender){
                    let gender = data.gender.trim();
                    userInfo.gender = FacebookTokenInfo.GENDER[gender]?FacebookTokenInfo.GENDER[gender]:-1 
                }
                
                
                return userInfo;
            }
            else{
                this._logger.error(`FacebookRepository::getinfo - Status Code : ${statusCode}  - Reques Data : ${fbId}`);
                return Promise.reject({response});
            }
        }catch(error){
            this._logger.info(`FacebookRepository::getinfo - Error - Request Data : ${fbId}`);
            return Promise.reject(error);
        }
        
    }
    
}