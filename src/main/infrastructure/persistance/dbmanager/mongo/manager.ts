import {
    connect,disconnect, Mongoose,ConnectionOptions}  from 'mongoose'
import { ILogger } from '@core/logger';
import { injectable, inject } from '@core/di';
import { TYPE } from '@infrastructure/di';
import { MongoConfig } from '@infrastructure/persistance/dbmanager/config';

@injectable()
export default class MongoDManager{
    isConnected :boolean=false;
    config : MongoConfig;
    pool? : Mongoose;
    _logger : ILogger;
    constructor(
        @inject(TYPE.CONFIG.MONGO_DATABASE) config:MongoConfig,
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger
        )
        {
            this.config = config;
            this._logger = logger;
            this._bindHandler();
    }

    async retry(){
        
    }

    async connect() : Promise<boolean>{

        return connect(this.config.url,this.config.options).then((pool)=>{
            this._logger.info('MongoDManager.connect','Connected',this.config);
            this.isConnected=true;
            this.pool = pool;
            return this.isConnected;
        }).catch((err:any)=>{
            this._logger.error('MongoDManager.connect',err.name,err.code,err.message);
            throw new  Error('UNABLE TO CREATE DB POOL')
        });
    }
    async closePool(){
        return disconnect();
    }

    _bindHandler(){
        
    }

}