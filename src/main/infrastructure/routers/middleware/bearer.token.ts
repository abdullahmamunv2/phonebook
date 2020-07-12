export default (req : any,res : any,next:any)=>{
    let authorization = req.headers.authorization;
    let token = '';
    if(authorization && authorization.split(' ')[0] === 'Bearer') {
        token = authorization.split(' ')[1];
    }
    req.token = token;
    next();
}