const router = require("express").Router();

const blogController = require("../controller/blog");

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.singleBlog);
router.post("/new", blogController.createBlog);
router.put("/editblog/:id", blogController.editBlog);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
