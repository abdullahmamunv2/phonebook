import invalidHttpMethod  from  './invalid.method';
import {Application}     from 'express';
import apiRouter         from './api.router';

export default function(app : Application) : void{
    app.use('/api',apiRouter);
    app.use('/push',(req,res)=>{
        console.log(req.body);
        res.json({});
    })
    app.all('/*',invalidHttpMethod);
}
