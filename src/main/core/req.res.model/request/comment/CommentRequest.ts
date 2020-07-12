

export default class CommentRequest {

    static STATUS: any = {
        DISPLAYABLE : 1,
        BLOCKED : 2,
    }

    commentorId : string;
    id? : string;
    blogId : string;
    parentCommentId : string | undefined = '';
    commentLevel : number  =0;
    body  : string = '';

    status : number = CommentRequest.STATUS.DISPLAYABLE

    constructor(blogId : string,commentorId:string,body:string,parentCommentId : string){
        this.commentorId = commentorId;
        this.body        = body;
        this.parentCommentId = parentCommentId;
        this.blogId      = blogId;

    }
}