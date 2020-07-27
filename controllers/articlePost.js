const path = require('path')
const Post = require('../database/models/Article')

module.exports = (req, res) => {
  const { image } = req.files;

  const uploadFile = path.resolve(
    __dirname, '..' ,"public/articlesImages", image.name);

  image.mv(uploadFile, (error) => {
    Post.create(
      {
        ...req.body,
        image: `/articlesImages/${image.name}`,
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
};
