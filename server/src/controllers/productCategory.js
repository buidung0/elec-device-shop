const ProductCategory = require("../../src/models/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : " can't create new product category",
  });
});
const getAllCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select();
  return res.json({
    success: response ? true : false,
    productCategory: response ? response : " can't get product category",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedCategory: response ? response : " can't update product category",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.json({
    success: response ? true : false,
    deletedCategory: response ? response : " can't delete product category",
  });
});

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
