const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      address,
      secretQuestion,
      secretAnswer,
    } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "E-mail is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!mobile) {
      return res.send({ message: "Mobile Number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    if (!secretQuestion) {
      return res.send({ message: "Secret question is required" });
    }
    if (!secretAnswer) {
      return res.send({ message: "Secret answer is required" });
    }

    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "You are already registered",
      });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      mobile,
      address,
      password: hashedPassword,
      secretQuestion,
      secretAnswer,
    }).save();
    res.status(201).send({
      success: true,
      message: "user register succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
const forgotPasswordController = async (req, res) => {
  try {
    const { email, secretAnswer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!secretAnswer) {
      return res.status(400).send({ message: "Secret answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    // Check if the secret answer is correct
    if (user.secretAnswer !== secretAnswer) {
      return res.status(400).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    // Hash the new password
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const testController = (req, res) => {
  res.send("Protected route");
};

const updateProfileController=async(req,res)=>{
  try {
    const { name, email, password, address, mobile } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        mobile: mobile || user.mobile,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
}

const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
};