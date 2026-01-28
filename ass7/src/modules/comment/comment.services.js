import { Op } from "sequelize";
import { Comment } from "../../DB/models/comment.model.js";
import { Post } from "../../DB/models/post.model.js";
import { User } from "../../DB/models/user.model.js";

export const bulkCommentsCreate = async (comments) => {
  try {
    // Optional: check post existence
    for (const c of comments) {
      const postExists = await Post.findByPk(c.postId); // lowercase
      if (!postExists) {
        throw new Error(`Post with ID ${c.postId} does not exist`);
      }
    }

    const newComments = await Comment.bulkCreate(comments);
    return newComments;
  } catch (error) {
    throw new Error("Error creating comments: " + error.message);
  }
};

export const updateByOwner = async (id, userId, content) => {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error(`comment with id ${id} does not exist`);
    }
    if (comment.userId !== userId) {
      throw new Error(`User with id ${userId} is not the owner of the comment`);
    }
    await comment.update({ content });
    return comment;
  } catch (error) {
    console.error("Error updating comment:", error.message);
    throw error;
  }
};

export const findOrCreateComment = async (postId, userId, content) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error(`Post with id ${postId} does not exist`);

    const user = await User.findByPk(userId);
    if (!user) throw new Error(`User with id ${userId} does not exist`);

    let comment = await Comment.findOne({ where: { postId, userId, content } });

    let created = false;
    if (!comment) {
      comment = await Comment.create({ postId, userId, content });
      created = true;
    }

    return { comment, created };
  } catch (error) {
    throw new Error("Error in findOrCreateComment: " + error.message);
  }
};

export const findCommentBySpecificWord = async (word) => {
  try {
    const comments = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });
    return comments;
  } catch (error) {
    throw new Error(
      "Error finding comments by specific word: " + error.message,
    );
  }
};

export const most3RecentComments = async (postId) => {
  try {
    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    return comments;
  } catch (error) {
    throw new Error("Error fetching most recent comments: " + error.message);
  }
};
export const getCommentById = async (id) => {
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Post, as: "post", attributes: ["id", "title"] },
      ],
    });
    return comment;
  } catch (error) {
    throw new Error("Error fetching comment by ID: " + error.message);
  }
};
