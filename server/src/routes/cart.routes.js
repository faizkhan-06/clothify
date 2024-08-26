import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addToCart,
  deleteCart,
  deleteCartItem,
  getCart,
  updateCartQuantity,
} from "../controllers/cart.controller";

const router = Router();

router.route("/").post(verifyJWT, addToCart);
router.route("/").get(verifyJWT, getCart);
router.route("/:itemId").put(verifyJWT, updateCartQuantity);
router.route("/").delete(verifyJWT, deleteCart);
router.route("/:itemId").delete(verifyJWT, deleteCartItem);
export default router;
