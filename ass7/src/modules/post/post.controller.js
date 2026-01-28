import { Router } from "express";
import { createPost, deleteByIdOwner, getAllPostDetails, getCommentsCount } from "./post.services.js";

const postRouter = Router();

postRouter.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await createPost(title, content, userId);
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
postRouter.delete("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;   
        await deleteByIdOwner(postId, userId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "post not found", error: error.message });
    } 

});
postRouter.get("/details", async ( req,res) => {
    try {
        const posts = await getAllPostDetails();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});    
postRouter.get("/comment-count", async ( req,res) => {
    try {
        const posts = await getCommentsCount();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}); 

export default postRouter;
