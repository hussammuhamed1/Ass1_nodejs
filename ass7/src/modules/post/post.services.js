import { sequelize } from "../../DB/db.connection.js";
import { Comment } from "../../DB/models/comment.model.js";
import { Post } from "../../DB/models/post.model.js";
import { User } from "../../DB/models/user.model.js";

export const createPost = async (title, content, userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with id ${userId} does not exist`);
    }

    const newPost = await Post.create({ title, content, userId });
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
};

export const deleteByIdOwner = async (postId, userId) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new Error(`Post with id ${postId} does not exist`);
    }
    if (post.userId !== userId) {
      throw new Error(`User with id ${userId} is not the owner of the post`);
    }
    await post.destroy();
    return true;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error;
  }
};
export const getAllPostDetails = async () => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name"] },
        { model: Comment, as: "comments", attributes: ["id", "content"] },
      ],
      exclude: ["userId", "content"],
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};
export const getCommentsCount = async () => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment, as: "comments", attributes: [] }],
      exclude : ["content", "userId"],
        
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("comments.id")),
            "commentsCount",
          ],
        ]
      },
      group: ["Post.id"],
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts with comments count:", error.message);
    throw error;
  }
};
