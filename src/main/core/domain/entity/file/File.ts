
export default class File{
    userId? : number;
    raw : any;
    name? : string;
    mimetype? : string;
    extension : string;
    size : number; // in
    url :string = ''; 
    constructor(raw:any,extension:string,size:number){
        this.raw = raw;
        this.extension = extension;
        this.size = size;
    }
}