const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const {createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, realtedProductController, braintreeTokenController, brainTreePaymentController} = require("../controllers/productController");
const formidable = require("express-formidable");
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.get('/get-product',getProductController)

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid",productPhotoController)

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

router.get("/related-product/:pid/:cid", realtedProductController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports = router;
