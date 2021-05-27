import { BasicArticle, Article } from "../types/article";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (article: Article, callback: Function) => {
  // console.log("at line 6", article)
    const queryString = "INSERT INTO articles (nickName, title, content, creationDate ) VALUES (?, ?, ?, ?)"
  
    db.query(
      queryString,
      [article.nickName, article.title, article.content, article.creationDate],
      (err, result) => {
        // console.log("at line 12", result)
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findOne = (articleId: number, callback: Function) => {

    const queryString = `SELECT * FROM articles WHERE id = ?`
      
    db.query(queryString, articleId, (err, result) => {
      if (err) {
        // callback(err)
        return err
      }
      
      const row = (<RowDataPacket> result)[0];
      const articles: Article =  {
          id: row.id,
          nickName: row.nickName,
          title: row.title,
          content: row.content,
          creationDate: row.creationDate
        
    }
    callback(null, articles);
  });
}

export const update = (article: Article, callback: Function) => {
    // console.log("at line 41", article)
    
    const queryString = `UPDATE articles SET nickName=?, title=?, content=?, creationDate=? WHERE id=?`;
  
    db.query(
      queryString,
      [article.nickName, article.title, article.content, article.creationDate, article.id],
      (err, result) => {
        if (err) {callback(err)}
        callback(null);
      }
    );
}


export const findAll = (callback: Function) => {
    
    let sql = 'SELECT * FROM articles WHERE id>0 ORDER BY id LIMIT 0,20';

    let query = db.query(sql, (err, result) => {
      if (err) {callback(err)}
      const rows = <RowDataPacket[]> result;
      const articles: Article[] = [];
  
      rows.forEach(row => {
        const article: Article =  {
          id: row.id,
          nickName: row.nickName,
          title: row.title,
          content: row.content,
          creationDate: row.creationDate
        }
        articles.push(article);
      });
      callback(null, articles);
    });
  }