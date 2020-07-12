import {Request,Response,NextFunction}     from 'express';

export default (headers : string[])=>{
    return (req : Request,res : Response,next : NextFunction)=>{
        let isFound = false;
        for(let i=0;i<headers.length;i++){
            let header = headers[i].toLowerCase();
            if(req.headers.hasOwnProperty(header)){
                req.headers.msisdn = req.headers[header];
                isFound = true;
                break;
            }
        }
        if(!isFound){
            req.headers.msisdn = '';
        }
        next();
    }
}