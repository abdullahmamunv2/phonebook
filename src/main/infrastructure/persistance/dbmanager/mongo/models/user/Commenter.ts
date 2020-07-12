import { Document, Schema, Model, model} from "mongoose";


/*

*/
export class CommenterInnerModel {
  public username  : string = "";
  public password  : string = "";
  public referrer  : number = 1;
  public type      : number=-1;
  public isBanned  : boolean=false;
}

export interface CommenterDocument extends CommenterInnerModel,Document{
  createdAt?  : Date|null;
  updatedAt?  : Date|null;
}


var DirectSignupSchema: Schema = new Schema({
    username : String,
    password : String,
    referrer : String,

    type     : String,
    isBanned : Boolean
});

DirectSignupSchema.pre<CommenterDocument>("save", function(next) {
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
});

DirectSignupSchema.pre<CommenterDocument>("update", function(next) {
    let now = new Date();
    if (!this.updatedAt) {
      this.updatedAt = now;
    }
    next();
});


export  const CommenterModel: Model<CommenterDocument> = model<CommenterDocument>("DirectSignup", DirectSignupSchema);