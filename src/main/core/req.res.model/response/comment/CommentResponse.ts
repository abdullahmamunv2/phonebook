

export default class CommentResponse {

    id? : string;
    blogId : string;
    parentCommentId : string | undefined = '';
    commentLevel : number  =0;
    body  : string = '';
    isAuthorized : boolean = false;
    commentorId : string;
    constructor(blogId : string,commentorId:string,body:string,parentCommentId : string){
        this.commentorId = commentorId;
        this.body        = body;
        this.parentCommentId = parentCommentId;
        this.blogId      = blogId;

    }
}