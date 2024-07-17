const slugify = require("slugify");
const ProductModel = require("../models/ProductModel");
const orderModel= require('../models/orderModel')
const fs = require("fs");
const dotenv=require('dotenv')
var braintree = require("braintree");

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and sholud be less than 2 mb" });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Product",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      products,
      totalCount: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Products",
      error,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const products = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Single Product",
      error,
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.pid).select(
      "photo"
    );
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Fetching Photo",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Delete Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Fetching Product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and sholud be less than 2 mb" });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Product",
    });
  }
};

 const productFiltersController = async (req, res) => {
   try {
     const { checked } = req.body;

     // Prepare the filter criteria
     const filterCriteria = {};
     if (checked && checked.length > 0) {
       filterCriteria.category = { $in: checked }; // Filter by categories in checked array
     }

     // Example: Adding price range filter if radio buttons are used
     // const { radio } = req.body;
     // if (radio && radio.length === 2) {
     //   filterCriteria.price = { $gte: radio[0], $lte: radio[1] };
     // }

     // Fetch products based on filter criteria
     const products = await ProductModel.find(filterCriteria);

     res.status(200).send({
       success: true,
       products,
     });
   } catch (error) {
     console.log(error);
     res.status(400).send({
       success: false,
       message: "Error While Filtering Products",
       error,
     });
   }
 };

  const productCountController = async (req, res) => {
    try {
      const total = await ProductModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };

   const productListController = async (req, res) => {
     try {
       const perPage = 6;
       const page = req.params.page ? req.params.page : 1;
       const products = await ProductModel
         .find({})
         .select("-photo")
         .skip((page - 1) * perPage)
         .limit(perPage)
         .sort({ createdAt: -1 });
       res.status(200).send({
         success: true,
         products,
       });
     } catch (error) {
       console.log(error);
       res.status(400).send({
         success: false,
         message: "error in per page ctrl",
         error,
       });
     }
   };

   const realtedProductController = async (req, res) => {
     try {
       const { pid, cid } = req.params;
       const products = await productModel
         .find({
           category: cid,
           _id: { $ne: pid },
         })
         .select("-photo")
         .limit(3)
         .populate("category");
       res.status(200).send({
         success: true,
         products,
       });
     } catch (error) {
       console.log(error);
       res.status(400).send({
         success: false,
         message: "error while geting related product",
         error,
       });
     }
   };

   const braintreeTokenController = async (req, res) => {
     try {
       gateway.clientToken.generate({}, function (err, response) {
         if (err) {
           res.status(500).send(err);
         } else {
           res.send(response);
         }
       });
     } catch (error) {
       console.log(error);
     }
   };

   //payment
   const brainTreePaymentController = async (req, res) => {
     try {
       const { nonce, cart } = req.body;
       let total = 0;
       cart.map((i) => {
         total += i.price;
       });
       let newTransaction = gateway.transaction.sale(
         {
           amount: total,
           paymentMethodNonce: nonce,
           options: {
             submitForSettlement: true,
           },
         },
         function (error, result) {
           if (result) {
             const order = new orderModel({
               products: cart,
               payment: result,
               buyer: req.user._id,
             }).save();
             res.json({ ok: true });
           } else {
             res.status(500).send(error);
           }
         }
       );
     } catch (error) {
       console.log(error);
     }
   };

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  realtedProductController,
  braintreeTokenController,
  brainTreePaymentController,
};
