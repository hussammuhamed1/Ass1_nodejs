import { Router } from "express";
import {
  bulkCommentsCreate,
  findCommentBySpecificWord,
  findOrCreateComment,
  getCommentById,
  most3RecentComments,
  updateByOwner,
} from "./comment.services.js";

const commentRouter = Router();

commentRouter.post("/", async (req, res) => {
  try {
    let commentsArray = req.body.comments;
    if (!Array.isArray(commentsArray) || commentsArray.length === 0) {
      return res.status(400).json({ message: "Invalid comments array" });
    }

    // Map PostId to postId
    commentsArray = commentsArray.map((c) => ({
      content: c.content,
      userId: c.userId,
      postId: c.PostId, // map to correct field
    }));

    const newComments = await bulkCommentsCreate(commentsArray);

    res.status(201).json({
      message: "Comments created successfully",
      comment: newComments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
commentRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;
    const updatedComment = await updateByOwner(id, userId, content);
    res
      .status(200)
      .json({
        message: "Comment updated successfully",
        comment: updatedComment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
commentRouter.post("/find-or-create", async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const { comment, created } = await findOrCreateComment(
      postId,
      userId,
      content,
    );
    const message = created
      ? "Comment created successfully"
      : "Comment already exists";
    res.status(200).json({ message, comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

commentRouter.get("/search", async (req, res) => {
  try {
    const { word } = req.query;
    const comments = await findCommentBySpecificWord(word);
    res.status(200).json({ comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

commentRouter.get("/newest/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await most3RecentComments(postId);
    res.status(200).json({ comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
commentRouter.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getCommentById(id);
    res.status(200).json({ comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
export default commentRouter;
