import express from "express";
import { checkConnection } from "./DB/db.connection.js";
import { User } from "./DB/models/user.model.js";
import { Post } from "./DB/models/post.model.js";
import { Comment } from "./DB/models/comment.model.js";
import userRouter from "./modules/user/user.controllers.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comment/comment.controllers.js";
const bootstrap = async () => {
  const app = express();
  app.use(express.json());
  const PORT = 3000;
  checkConnection();
  await User.sync({ alter: false });
  await Post.sync({ alter: false });
  await Comment.sync({ alter: false });
  app.use("/user", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
  Post.belongsTo(User, { foreignKey: "userId", as: "user" });
  User.hasMany(Post, { foreignKey: "userId", as: "posts" });
  Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
  User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
  Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });
  Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default bootstrap;
