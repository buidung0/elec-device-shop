const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/", ctrls.getAllBlog);

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.fields([{ name: "image", maxCount: 1 }]),
  ctrls.createNewBlog
);

router.get("/one/:bid", ctrls.getBlog);
router.get("/current", verifyAccessToken, ctrls.getCurrentBlog);
router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImagesBlog
);

router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteNewBlog);
router.put("/likes/:bid", verifyAccessToken, ctrls.likeBlog);
router.put("/dislikes/:bid", verifyAccessToken, ctrls.dislikeBlog);
router.put(
  "/update/:bid",
  [verifyAccessToken, isAdmin],
  uploader.fields([{ name: "image", maxCount: 1 }]),
  ctrls.updateNewBlog
);

module.exports = router;
