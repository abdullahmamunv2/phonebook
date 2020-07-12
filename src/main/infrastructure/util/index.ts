
import {operation} from 'retry'


export const wait = (ms:number) => new Promise<any>(r => setTimeout(r, ms));


export const retryAtFixedRate = (times:number=1,delay : number=5000,fn : (...args : any[]) => Promise<any>,...args:any[]) => {
  let op = operation({
    retries: times,
  })
  return new Promise((resolve,reject)=>{
    op.attempt((currentAttempt)=>{
        fn(...args).then((value)=>{
            resolve(value);
        }).catch((reason)=>{
          //console.log(op.retry(reason));
          if (op.retry(reason)) {
            return;
          }
          reject(reason);
        })
    })
  })
  
  
};