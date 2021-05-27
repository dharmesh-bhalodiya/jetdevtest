import express, {Request, Response} from "express";
import * as articleModel from "../models/article";
import {Article, BasicArticle} from "../types/article";
import {db} from "../db"
const articleRouter = express.Router();

articleRouter.get("/hello", async (req: Request, res: Response) => {
    res.status(200).send({
        message: "Hello World!...",
        status: "success"
    })
})

articleRouter.get("/getAllArticles", async (req: Request, res: Response) => {
    // console.log(req.body)
  articleModel.findAll((err: Error, articles: Article[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": articles});
  })

});

articleRouter.post("/postArticle", async (req: Request, res: Response) => {
  const newArticle: Article = req.body;
  // console.log("at line 30",newArticle)
  if(newArticle.nickName && newArticle.title && newArticle.content && newArticle.creationDate){
    const data = articleModel.create(newArticle, (err: Error, Id: number) => {
      // console.log("at line 31", newArticle)
      if (err) {
        return res.status(500).json({"message": err.message});
      }

      return res.status(200).json({"id": Id, "message": "Successfully posted"});
    });
  }
  else {
      return res.status(400).send("invalid request")
  }
  // return data
});


articleRouter.get("/:id", async (req: Request, res: Response) => {
  const articleId: number = Number(req.params.id);
  articleModel.findOne(articleId, (err: Error, article: Article) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"Content": article.content});
  })
});

articleRouter.put("/:id", async (req: Request, res: Response) => {
  const article: Article = req.body;
  const updatedArticle = req.params.id;
  // console.log(article)
  // console.log(updatedArticle)
  articleModel.update(article, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

export {articleRouter};