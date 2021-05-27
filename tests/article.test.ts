import app = require('../app');
import 'mocha';
import { articleRouter } from '../routes/articleRouter';
import { commentRouter } from '../routes/commentRouter';
import * as articleModel from "../models/article";
import * as commentModel from "../models/comment";
import { Article } from '../types/article';
import chai from 'chai';
import chaiHttp from 'chai-http';


chai.use(chaiHttp);

const expect = chai.expect;

describe('Article API Requests', () => {
  
  it('Get request to find article content with id', () => {
    return chai.request(app).get('/articles/1')
      .then(res => {
        chai.expect(res.status).to.eql(200);
      })
  })


  it('Get request to find article content without id', () => {
      return chai.request(app).get('/articles/')
        .then(res => {
          chai.expect(res.status).to.eql(404);
        })
    })

    
  it("Get request to find all articles", () => {
      return chai.request(app).get('/articles/getAllArticles')
        .then(res => {
            chai.expect(res.status).to.eql(200)
        })
  })

//   it("Get request to find all articles with wrong route", () => {
//     return chai.request(app).get('/articles/getArticles')
//       .then(res => {
//           chai.expect(res.status).to.eql(200)
//       })
// })

  

  it("Post request to post an article", () =>{
      const article: any = {
          nickName: "ManojD",
          title: "IPL 2021",
          content: "asdfghjkl",
          creationDate: "2021-05-26"
      };
        return chai.request(app).post('/articles/postArticle')
        .send(article)
        .then(res => {
            chai.expect(res.body.message).to.eql("Successfully posted")
      })
  })

  it("Post request to post an article without title", () =>{
    const article: any = {
        nickName: "ManojD",
        content: "asdfghjkl",
        creationDate: "2021-05-26"
    };
      return chai.request(app).post('/articles/postArticle')
      .send(article)
      .then(res => {
          chai.expect(res.status).to.eql(400)
    })
})

it("Post request to post an article without nickname", () =>{
  const article: any = {
      title: "ipl 2021",
      content: "asdfghjkl",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/articles/postArticle')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})

it("Post request to post an article without content", () =>{
  const article: any = {
      nickName: "ManojD",
      title: "IPL 2021",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/articles/postArticle')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})

it("Post request to post an article without creationDate", () =>{
  const article: any = {
      nickName: "ManojD",
      title: "IPL 2021",
      content: "asdfghjkl",
  };
    return chai.request(app).post('/articles/postArticle')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})

})

describe('comment API Requests', () => {

    
  it("Get request to find all comments", () => {
      return chai.request(app).get('/comments/getAllComments')
        .then(res => {
            chai.expect(res.status).to.eql(200)
        })
  })

//   it("Get request to find all articles with wrong route", () => {
//     return chai.request(app).get('/articles/getArticles')
//       .then(res => {
//           chai.expect(res.status).to.eql(200)
//       })
// })

  

  it("Post request to post a comment", () =>{
      const article: any = {
          articleId : 1,
          nickName: "ManojD",
          title: "IPL 2021",
          content: "asdfghjkl",
          creationDate: "2021-05-26"
      };
        return chai.request(app).post('/comments/postComment')
        .send(article)
        .then(res => {
            chai.expect(res.body.message).to.eql("Successfully COmmented")
      })
  })

  it("Post request to post a comment without articleId", () =>{
    const article: any = {
        nickName: "ManojD",
        title: "IPL 2021",
        content: "asdfghjkl",
        creationDate: "2021-05-26"
    };
      return chai.request(app).post('/comments/postComment')
      .send(article)
      .then(res => {
          chai.expect(res.status).to.eql(400)
    })
})

it("Post request to post a comment without Content", () =>{
  const article: any = {
      articleId : 1,
      nickName: "ManojD",
      title: "IPL 2021",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/comments/postComment')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})

it("Post a comment on comment", () =>{
  const article: any = {
    articleId : 1,
      commentId: 2,
      nickName: "ManojD",
      content: "asdfghjkl",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/comments/post/CommentOnComment')
    .send(article)
    .then(res => {
        chai.expect(res.body.message).to.eql("Successfully COmmented")
  })
})

it("Post a comment on comment without articleId", () =>{
  const article: any = {
      commentId: 2,
      nickName: "ManojD",
      content: "asdfghjkl",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/comments/post/CommentOnComment')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})


it("Post a comment on comment without commentId", () =>{
  const article: any = {
      articleId: 2,
      nickName: "ManojD",
      content: "asdfghjkl",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/comments/post/CommentOnComment')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})

it("Post a comment on comment without both articleId and commentId", () =>{
  const article: any = {
      nickName: "ManojD",
      content: "asdfghjkl",
      creationDate: "2021-05-26"
  };
    return chai.request(app).post('/comments/post/CommentOnComment')
    .send(article)
    .then(res => {
        chai.expect(res.status).to.eql(400)
  })
})

})

