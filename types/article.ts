export interface BasicArticle {
    id: number,
  }
  
  export interface Article extends BasicArticle{
    nickName: string,
    title: string,
    content: string,
    creationDate: Date

  }