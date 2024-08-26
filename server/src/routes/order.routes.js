import { Router } from "express";
import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  updateOrderById,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/authAdmin.middleware.js";
const router = Router();

router.route("/").post(verifyJWT, createOrder);
router.route("/").get(verifyJWT, getOrders);
router.route("/:id").get(verifyJWT, getOrderById);

router.route("/:id").put(verifyJWT, verifyAdmin, updateOrderById);
router.route("/:id").delete(verifyJWT, verifyAdmin, deleteOrderById);

export default router;
