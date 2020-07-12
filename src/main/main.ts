import {join} from 'path';
import {configure , getLogger, Logger,shutdown} from 'log4js'
import {config as dotEnvConfig} from 'dotenv';

import 'reflect-metadata';

dotEnvConfig();

/**
 * This Root Path is based on dist/${env} folder.
 * env : development : staging : production
 */
declare global {
    namespace NodeJS {
        interface Global {
            rootPath: string
        }
    }
}
const rootPath = join(__dirname, '../',);
global.rootPath = rootPath;

/**
 * Configuring Module alais.
 */
require(rootPath+'module.alias.config')();

/**
 * 
 */
const config    = require('config')
import {
    HttpServer,
    IServer
}  from '@infrastructure/server'

import {App} from '@infrastructure/app'
let serverConfig = config.get('SERVER');
import { IOContainer } from '@infrastructure/ioc';
import { TYPE } from '@infrastructure/di';
import { DatabaseManager } from '@infrastructure/persistance/dbmanager/mssql';
import {MongoDBManager }  from '@infrastructure/persistance/dbmanager/mongo';

import {retryAtFixedRate} from '@infrastructure/util'



class Application {
    server : IServer;
    logger : Logger ;
    dbManager : MongoDBManager;

    static async Main(){
        await new Application().boot();
    }
    constructor(){
        this.configure();
        this.logger = getLogger('Application');
        this.dbManager = IOContainer.get<MongoDBManager>(TYPE.DATABASE.MONGO_MANAGER);
        this.server = new HttpServer(serverConfig.host,serverConfig.port.http,App);
    }
    _pm2Config(){
        if(process.env.NODE_IN_PM2){
            //gracefull stop
            process.on('SIGINT', ()=> {
                this.logger.info('Shutdown signal -> SIGNIT');
                this.graceShutdown(0);
            });
            process.on('message', (msg)=> {
                if (msg == 'shutdown'){
                    this.logger.info('PM2 : Shutdown message -> shutdown');
                    this.graceShutdown(0);
                }
            });
        }
    }
    _notifyPm2(){
        if(process.env.NODE_IN_PM2){
            //gracefull start
            if(process && process.send){
                process.send('ready');
                this.logger.info('Ready notification has been sent to PM2');
            }
            
        }
    }
    configure(){
        //Configuring Logger.
        configure(rootPath+'log4js.json');

        // configure pm2
        this._pm2Config();
    }
    async boot(){
        try{
            await retryAtFixedRate(4,5000,this.dbManager.connect.bind(this.dbManager));
            try{
                await this.server.start();
                this.logger.info(`Server listening on ${serverConfig.host}:${serverConfig.port.http}`)
                this._notifyPm2();
            }catch(err){
                this.logger.error(`Server shutting down..... Cause : ${err.message}`);
                this.graceShutdown(1);
            }
        }
        catch(err){
            this.logger.error(`Server shutting down..... Cause : Unable to create database Pool.`);
            this.graceShutdown(1);
        }
    }

    async graceShutdown(exitCode=0){
        this.logger.info(`##Graceful Shutdown Start##`);
        try{
            this.logger.info(`Database Pool closing.....`);
            await this.dbManager.closePool();
            this.logger.info(`Database Pool closing.....`);
        }catch(err){
            this.logger.error(`Databaase Pool closing failed - Cause : ${err.message}`);
        }
        try{
            this.logger.info(`Server shutting down.....`);
            await this.server.stop();
            this.logger.info(`Server shut down.`);
        }catch(err){
            this.logger.error(`Server shutting down failed - Cause : ${err.message}`);
        }
        this.logger.error(`Process Exit with code : ${exitCode}`);
        shutdown(() => {
            process.exit(exitCode);
        });
        
    }
}

Application.Main();

