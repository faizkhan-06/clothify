import { Router } from "express";
import {
  addProducts,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/authAdmin.middleware.js";
const router = Router();

router.route("/").post(verifyJWT, verifyAdmin, addProducts);
router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/:id").put(verifyJWT, verifyAdmin, updateProduct);
router.route("/:id").delete(verifyJWT, verifyAdmin, deleteProduct);

export default router;
