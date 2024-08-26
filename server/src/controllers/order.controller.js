import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.models.js";

export const createOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { shippingAddress, items } = req.body;

  // Check for missing fields in the shipping address
  const requiredFields = ["street", "city", "state", "zip", "country"];
  const missingFields = requiredFields.filter((field) => {
    return !shippingAddress[field] || shippingAddress[field].trim() === "";
  });

  if (missingFields.length > 0) {
    throw new ApiError(
      400,
      `Missing fields in shipping address: ${missingFields.join(", ")}`
    );
  }

  // Check if items are present
  if (!items || items.length === 0) {
    throw new ApiError(400, "Order must include at least one item");
  }

  // Calculate total amount
  const totalAmount = items.reduce((acc, item) => {
    if (!item.product || !item.quantity || !item.price) {
      throw new ApiError(400, "Invalid order items");
    }
    return acc + item.price * item.quantity;
  }, 0);

  // Round the total amount to two decimal places
  const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

  // Create the order
  const order = await Order.create({
    user: user._id,
    shippingAddress,
    items,
    totalAmount: roundedTotalAmount,
  });

  // Respond with the created order
  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  // Validate that the order ID is provided
  if (!orderId) {
    throw new ApiError(400, "Order ID not found");
  }

  // Find the order by its ID, and optionally populate related fields like user and items
  const order = await Order.findById(orderId)
    .populate("user", "name email")
    .populate("items.product", "name price");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Return the order data with a successful response
  res.status(200).json(new ApiResponse(200, order, "Order found successfully"));
});

export const getOrders = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const orders = await Order.find({ user: user._id })
    .populate("user", "name email")
    .populate("items.product", "name price");
  if (!orders || orders.length === 0) {
    throw new ApiError(404, "Order not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders found successfully "));
});

export const updateOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { orderStatus } = req.body;

  // Validate orderId
  if (!orderId) {
    throw new ApiError(400, "Order ID not found");
  }

  // Validate orderStatus
  if (!orderStatus) {
    throw new ApiError(400, "Order status is required");
  }

  // Ensure orderStatus is one of the allowed values
  const validStatuses = ["processing", "shipped", "delivered"];
  if (!validStatuses.includes(orderStatus)) {
    throw new ApiError(400, "Invalid order status");
  }

  // Update order
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: { orderStatus },
    },
    { new: true } // Return the updated order
  );

  // Check if order was found
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Respond with updated order
  res
    .status(200)
    .json(new ApiResponse(200, order, "Order updated successfully"));
});

export const deleteOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  // Validate orderId
  if (!orderId) {
    throw new ApiError(400, "Order ID not found");
  }

  // Attempt to delete the order
  const order = await Order.findByIdAndDelete(orderId);

  // Check if order was found and deleted
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Respond with success message
  res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
});
