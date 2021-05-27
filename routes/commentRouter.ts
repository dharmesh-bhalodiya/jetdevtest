import express, {Request, Response} from "express";
import * as commentModel from "../models/comment";
import {Comment, ReComment, BasicComment} from "../types/comment";
import {db} from "../db"
const commentRouter = express.Router();

commentRouter.get("/hello", async (req: Request, res: Response) => {
    res.status(200).send({
        message: "Hello World!...",
        status: "success"
    })
})

commentRouter.get("/getAllComments", async (req: Request, res: Response) => {

  commentModel.findAll((err: Error, articles: Comment[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": articles});
  });
});


commentRouter.post("/postComment", async (req: Request, res: Response) => {
  const newComment: Comment = req.body;
  if(newComment.articleId && newComment.content){
    // console.log("at line 38",newComment.articleId)

      const data = commentModel.create(newComment, (err: Error, Id: number) => {
        // console.log("at line 41", newComment)
        if (err) {
          return res.status(500).json({"message": err.message});
        }
        return res.status(200).json({"id": Id, "message": "Successfully COmmented"});
      });
  }
  else {
    res.status(400).send("invalid request")
  }
//   return data
});

commentRouter.post("/post/CommentOnComment", async (req: Request, res: Response) => {
  const newComment: ReComment = req.body;
  console.log("at line 47",newComment)
  if(newComment.articleId && newComment.commentId){
    const data = commentModel.createComment(newComment, (err: Error, Id: number) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }

      return res.status(200).json({"message": "Successfully COmmented"});
    });
    return data;
  }
  else {
    return res.status(400).send("Input missing or invalid inputs")
  }
  //   return data
});


commentRouter.get("/:id", async (req: Request, res: Response) => {
  const commentId: number = Number(req.params.id);
  commentModel.findOne(commentId, (err: Error, comment: Comment) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": comment});
  })
});

commentRouter.put("/:id", async (req: Request, res: Response) => {
  const comment: Comment = req.body;
  const updatedComment = req.params.id;
  console.log(comment)
  console.log(updatedComment)
  commentModel.update(comment, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

export {commentRouter};