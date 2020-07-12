import {
    ConnectionPool,
    config,
    Request,
    Transaction,
    ConnectionError}  from 'mssql'
import { ILogger } from '@core/logger';
import { injectable, inject } from '@core/di';
import { TYPE } from '@infrastructure/di';

@injectable()
export default class DatabaseManager{
    isConnected :boolean=false;
    config : config;
    pool : ConnectionPool;
    _logger : ILogger;
    constructor(
        @inject(TYPE.CONFIG.DATABASE) config:config,
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger
        )
        {
            this.config = config;
            this.pool = new ConnectionPool(config);
            this._logger = logger;
            this._bindHandler();
    }

    async retry(){

    }

    async connect() : Promise<boolean>{

        return this.pool.connect().then(()=>{
            this._logger.info('DatabaseManager.connect','Connected',this.config.database);
            this.isConnected=true;
            return this.isConnected;
        }).catch((err:ConnectionError)=>{
            this._logger.error('DatabaseManager.connect',err.name,err.code,err.message);
            throw new  Error('UNABLE TO CREATE DB POOL')
        });
    }
    async makeRequest() : Promise<Request> {
        return Promise.resolve(new Request(this.pool));
    }
    async Request(transaction : Transaction) : Promise<Request>{
        return Promise.resolve(new Request(transaction));
    }
    async makeTransaction() : Promise<Transaction>{
        return Promise.resolve(new Transaction(this.pool))
    }
    async closePool(){
        return this.pool.close();
    }

    _bindHandler(){
        this.pool.on('error',(err)=>{
            this._logger.error('DatabaseManager::Pool.on.error',err.name,err.code,err.message);
        })
    }

}