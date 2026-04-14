const express = require('express');
const router = express.Router();

const {
    createTodo,
    updateTodo,
    readTodo,
    readAllTodo,
    deleteTodo,
    likeTodo,
    dislikeTodo,
    addComment,
    updateComment,
    removeLike,
    removeDislike
} = require("../controller/todoController");

// CRUD
router.get("/", readAllTodo);
router.get("/:id", readTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Likes 
router.put("/:id/like", likeTodo);
router.delete("/:id/like", removeLike);

// Dislikes
router.put("/:id/dislike", dislikeTodo);
router.delete("/:id/dislike", removeDislike);

// Comments
router.post("/:id/comments", addComment);
router.put("/:id/comments", updateComment);

module.exports = router;