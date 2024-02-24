const Brand = require("../../src/models/brand");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBrand: response ? response : " can't create new product Brand",
  });
});
const getAllBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    productBrand: response ? response : " can't get Brand",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await Brand.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedBrand: response ? response : " can't update product Brand",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await Brand.findByIdAndDelete(bcid);
  return res.json({
    success: response ? true : false,
    deletedBrand: response ? response : " can't delete product Brand",
  });
});

module.exports = {
  createBrand,
  getAllBrand,
  updateBrand,
  deleteBrand,
};
