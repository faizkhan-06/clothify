import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";

export const addProducts = asyncHandler(async (req, res) => {
  const { name, description, price, sizes, images, material } = req.body;
  if (
    [name, description, price, sizes, images, material].some((field) => {
      return (
        field === undefined ||
        field === null ||
        field === "" ||
        (Array.isArray(field) && field.length === 0)
      );
    })
  ) {
    throw new ApiError(400, "All fields are required ");
  }
  const product = await Product.create({
    name,
    description,
    price,
    sizes,
    images,
    material,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product is added"));
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (products.length === 0) {
    throw new ApiError(404, "No products found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Product fetched successfully"));
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    throw new ApiError(400, "No product ID found");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "No product found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product found successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, sizes, images, material } = req.body;
  if (!productId) {
    throw new ApiError(400, "Product ID not found");
  }
  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $set: { name, description, price, sizes, images, material },
    },
    { new: true }
  );
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully "));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    throw new ApiError(400, "Product ID not found");
  }
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully "));
});
