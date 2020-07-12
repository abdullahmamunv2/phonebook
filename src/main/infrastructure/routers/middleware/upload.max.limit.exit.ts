import { Request, Response, NextFunction } from "express";

const response = {
    status: "FAIL",
    error: {
        type: "VALIDATION_ERROR",
        details: [
            {
                "message": "file max limit exit",
                "errorCode": 0,
                "field": "file"
            }
        ]
    }
}

export default (maxLimit:number)=>{
    return (req : Request,res : Response,next : NextFunction)=>{
        res.status(400).json(response);
    }
}