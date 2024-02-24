const Services = require("../../src/models/services");
const asyncHandler = require("express-async-handler");

const createServices = asyncHandler(async (req, res) => {
  const response = await Services.create(req.body);
  return res.json({
    success: response ? true : false,
    message: response
      ? "Thanks for contacting us. We'll get back to you as soon as possible."
      : "You must fill all",
  });
});

const getServices = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];

  // Remove special fields from the query
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );

  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject = {};

  if (queries?.color) {
    const colorArr = queries.color.split(",").map((el) => el.trim());
    const colorQuery = colorArr.map((el) => ({
      color: { $regex: el, $options: "i" },
    }));
    colorQueryObject = { $or: colorQuery };
  }

  const q = { ...colorQueryObject, ...formatedQueries };

  let queryCommand = Services.find(q);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;

  queryCommand.skip(skip).limit(limit);

  const response = await Services.find();
  const counts = await Services.countDocuments(formatedQueries);
  return res.status(200).json({
    success: response ? true : false,
    counts,
    rs: response ? response : "cant get service",
  });
});

module.exports = { createServices, getServices };
