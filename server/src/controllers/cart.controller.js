import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { Cart } from "../models/cart.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addToCart = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    throw new ApiError(400, "Product ID and quantity are required");
  }
  if (quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than zero");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Find or create the cart for the user
  let cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    cart = new Cart({
      user: user._id,
      items: [],
      totalAmount: 0,
    });
  }

  // Check if the product is already in the cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update the quantity if the item already exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to the cart
    cart.items.push({ product: productId, quantity });
  }

  // Recalculate the totalAmount based on updated cart items
  cart.totalAmount = await cart.items.reduce(async (total, item) => {
    const product = await Product.findById(item.product); // Fetch product price
    if (!product) {
      throw new ApiError(404, "Product not found during total calculation");
    }
    return total + item.quantity * product.price;
  }, 0);

  await cart.save();
  res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

export const getCart = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const cart = await Cart.findOne({ user: user._id }).populate(
    "items.product",
    "name price"
  );
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart retrieved successfully"));
});

export const updateCartQuantity = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  if (!productId || quantity === undefined) {
    throw new ApiError(400, "Product ID and quantity are required");
  }
  if (quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than zero");
  }

  // Find the cart for the user
  let cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Find the index of the item in the cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update the quantity if the item already exists
    cart.items[existingItemIndex].quantity = quantity;
  } else {
    // Add new item to the cart
    cart.items.push({ product: productId, quantity });
  }

  // Recalculate the total amount
  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "price"
  );
  cart.totalAmount = updatedCart.items.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);

  // Save the updated cart
  await cart.save();

  // Respond with the updated cart
  res.status(200).json(new ApiResponse(200, cart, "Cart updated successfully"));
});

export const deleteCart = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const cart = await Cart.findOneAndDelete({ user: user._id });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  res.status(200).json(new ApiResponse(200, {}, "Cart deleted successfully"));
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const itemId = req.params.itemId;

  // Validate user and itemId
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  if (!itemId) {
    throw new ApiError(400, "Item ID not found");
  }

  // Find the user's cart
  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Find the item index in the cart's items array
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === itemId
  );

  // If the item is found, remove it
  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);

    // Recalculate the total amount after removing the item
    const updatedCart = await Cart.findById(cart._id).populate(
      "items.product",
      "price"
    );
    cart.totalAmount = updatedCart.items.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    // Save the updated cart
    await cart.save();

    // Respond with success
    res
      .status(200)
      .json(new ApiResponse(200, cart, "Item removed from cart successfully"));
  } else {
    throw new ApiError(404, "Item not found in cart");
  }
});
