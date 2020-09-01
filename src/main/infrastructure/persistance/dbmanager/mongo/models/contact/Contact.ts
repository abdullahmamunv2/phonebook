import { Document, Schema, Model, model} from "mongoose";


/*

*/
export class ContactInnerModel {
  public number  : string = "";
  public name    : string =""
}

export interface ContactDocument extends ContactInnerModel,Document{
  createdAt?  : Date|null;
  updatedAt?  : Date|null;
}


var ContactSchema: Schema = new Schema({
    number : String,
    name : String,
    isDeleted : Boolean
});

ContactSchema.pre<ContactDocument>("save", function(next) {
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
});

ContactSchema.pre<ContactDocument>("update", function(next) {
    let now = new Date();
    if (!this.updatedAt) {
      this.updatedAt = now;
    }
    next();
});


export  const ContactModel: Model<ContactDocument> = model<ContactDocument>("ContactDocument", ContactSchema);