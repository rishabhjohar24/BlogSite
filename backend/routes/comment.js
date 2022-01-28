const router = require("express").Router();

const commentController = require("../controller/comment");

router.post("/", commentController.postComment);
router.get("/:id", commentController.getComment);
router.put("/:id", commentController.editComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
