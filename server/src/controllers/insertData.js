// const Product = require("../../src/models/product");
// const asyncHandler = require("express-async-handler");
// const data = require("../../../data/data2.json");
// const categoryData = require("../../../data/cate_brand");
// const slugify = require("slugify");
// const ProductCategory = require("../models/productCategory");

// const colors = [
//   "RED",
//   "GREEN",
//   "BLUE",
//   "YELLOW",
//   "PURPLE",
//   "ORANGE",
//   "GRAY",
//   "BROWN",
//   "WHITE",
//   "PINK",
// ];
// function getRandomColor() {
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// }
// const randomColor = getRandomColor();

// const fn = async (product) => {
//   await Product.create({
//     title: product?.name,
//     slug:
//       slugify(product?.name) +
//       Math.round(Math.random() * 100) +
//       Math.round(Math.random() * 100) +
//       "",
//     description: product?.description,
//     brand: product?.brand,
//     thumb: product?.thumb,
//     totalRating: 0,
//     price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
//     category: product?.category[1],
//     quantity: Math.round(Math.random() * 1000),
//     sold: Math.round(Math.random() * 100),
//     images:
//       product?.images ||
//       "https://lh5.googleusercontent.com/yLhI5x4yd1lxp0mIjJ8vmd_XvyoloR0XMGK66RrJy5DXHsYD3Yina9kBaVwqgtyNCvPRDVAh7pkGTzbYs5ltsiaz8ohWPxtBH6T4zJeLBWW4g4mIPGFyK1_OsKgzE37396Y2_VMy",
//     color:
//       product?.variants?.find((el) => el.label === "Color")?.variants[0] ||
//       randomColor,
//   });
// };

// const insertProduct = asyncHandler(async (req, res) => {
//   const promises = [];
//   for (let product of data) promises.push(fn(product));
//   await Promise.all(promises);
//   return res.json("Done");
// });

// const fn2 = async (cate) => {
//   await ProductCategory.create({
//     title: cate?.cate,
//     brand: cate?.brand,
//     image: cate?.image,
//   });
// };

// const insertCategory = asyncHandler(async (req, res) => {
//   const promises = [];
//   console.log(categoryData);
//   for (let cate of categoryData) promises.push(fn2(cate));
//   await Promise.all(promises);
//   return res.json("Done");
// });

// module.exports = {
//   insertProduct,
//   insertCategory,
// };
