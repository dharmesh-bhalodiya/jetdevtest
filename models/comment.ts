import { BasicComment, ReComment, Comment } from "../types/comment";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (comment: Comment, callback: Function) => {
  console.log("at line 6", comment)
    const queryString = "INSERT INTO comments (articleId, nickName, content, creationDate ) VALUES (?, ?, ?, ?)";
  
    db.query(
      queryString,
      [comment.articleId, comment.nickName, comment.content, comment.creationDate],
      (err, result) => {
        console.log("at line 12",result)
        if (err) {callback(err)};
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const createComment = (comment: ReComment, callback: Function) => {
  console.log("at line 6", comment)
    const queryString = "INSERT INTO reComments (articleId, commentId, nickName, content, creationDate ) VALUES (?, ?, ?, ?, ?)";
  
    db.query(
      queryString,
      [comment.articleId, comment.commentId, comment.nickName, comment.content, comment.creationDate],
      (err, result) => {
        console.log("at line 12",result)
        if (err) {callback(err)};
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findOne = (commentId: number, callback: Function) => {

    const queryString = `SELECT * FROM comments WHERE id = ?`
      
    db.query(queryString, commentId, (err, result) => {
      if (err) {callback(err)}
      
      const row = (<RowDataPacket> result)[0];
      const comments: Comment =  {
          commentId: row.commentId,
          articleId: row.articleId,
          nickName: row.nickName,
          content: row.content,
          creationDate: row.creationDate
        
    }
    callback(null, comments);
  });
}

export const update = (comment: Comment, callback: Function) => {
    console.log("at line 41", comment)
    
    const queryString = `UPDATE comments SET nickname=?, content=?, creationDate=? WHERE id=?`;
  
    db.query(
      queryString,
      [comment.nickName, comment.content, comment.creationDate],
      (err, result) => {
        if (err) {callback(err)}
        callback(null);
      }
    );
}


export const findAll = (callback: Function) => {
    
    let sql = 'SELECT * FROM comments';

    let query = db.query(sql, (err, result) => {
      if (err) {callback(err)}
      const rows = <RowDataPacket[]> result;
      const comments: Comment[] = [];
  
      rows.forEach(row => {
        const comment: Comment =  {
            commentId: row.commentId,
            articleId: row.ArticleId,
          nickName: row.nickName,
          content: row.content,
          creationDate: row.creationDate
        }
        comments.push(comment);
      });
      callback(null, comments);
    });
  }