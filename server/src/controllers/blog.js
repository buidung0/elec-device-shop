const Blog = require("../../src/models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const image = req.files?.image[0]?.path;
  if (!(title && description && category)) throw new Error("Missing inputs");
  if (image) req.body.image = image;

  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Created Success" : " can't create new blog",
  });
});

const updateNewBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const files = req?.files;
  if (files?.image) req.body.image = files?.image[0]?.path;
  if (Object.keys(req.params).length === 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? "Updated !!!" : " can't update new blog",
  });
});

const getAllBlog = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format các toán tử
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );

  const formatedQueries = JSON.parse(queryString);
  // Lọc
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.description)
    formatedQueries.brand = { $regex: queries.description, $options: "i" };

  let queryObject = {};
  if (queries?.q) {
    delete formatedQueries.q;
    queryObject = {
      $or: [
        { title: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: "i" } },
        { description: { $regex: queries.q, $options: "i" } },
      ],
    };
  }
  const qr = { ...formatedQueries, ...queryObject };
  // Tạo truy vấn
  let queryCommand = Blog.find(qr);

  // Sắp xếp
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  //fields limit
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  //pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;

  queryCommand.skip(skip).limit(limit);

  const response = await queryCommand;
  const counts = await Blog.countDocuments(qr);

  // const response = await Blog.find();

  return res.json({
    success: response ? true : false,
    counts,
    Blog: response ? response : " can't get blog",
  });
});

const deleteNewBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);
  return res.json({
    success: response ? true : false,
    deleteBlog: response ? response : " Something went wrong",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("missing input");
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.json({ success: response ? true : false, rs: response });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({ success: response ? true : false, rs: response });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.json({ success: response ? true : false, rs: response });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("missing input");
  const blog = await Blog.findById(bid);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({ success: response ? true : false, rs: response });
  }
  const isDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.json({ success: response ? true : false, rs: response });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.json({ success: response ? true : false, rs: response });
  }
});
//
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberView: 1 } },
    { new: true }
  )
    .populate("likes", "firstName lastName")
    .populate("dislikes", "firstName lastName");
  return res.json({ success: blog ? true : false, rs: blog });
});

const uploadImagesBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("missing input");
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );
  console.log(response);
  return res.status(200).json({
    status: response ? true : false,
    updatedBog: response ? response : "canit upload images blog",
  });
});

const getCurrentBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findById({ bid })
    .select("")
    .populate("like", "id")
    .populate("dislike", "id");
  return res.status(200).json({
    success: blog ? true : false,
    rs: blog ? blog : "User not found",
  });
});

module.exports = {
  createNewBlog,
  updateNewBlog,
  getAllBlog,
  deleteNewBlog,
  likeBlog,
  dislikeBlog,
  getBlog,
  uploadImagesBlog,
  getCurrentBlog,
};
