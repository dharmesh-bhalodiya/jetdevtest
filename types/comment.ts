import {Article} from "./article"
export interface BasicComment {
    commentId: number,
  }
  
  export interface Comment extends BasicComment{
    articleId: Article,
    nickName?: string,
    content: string,
    creationDate: Date,
    // comment2_id? : number 
  }

  export interface ReComment extends Comment{
    reCommentId: number
  }