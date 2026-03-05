import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// ADD TO CART
const addToCart = async (req, res) => {
  try {

    const { userId, itemId, size } = req.body;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ success: false, message: "Invalid user token" });
    }
    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "itemId and size are required" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || typeof cartData[itemId] !== "object") {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "added to cart" });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// UPDATE CART
const updateCart = async (req, res) => {
  try {

    const { userId, itemId, size, quantity } = req.body;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ success: false, message: "Invalid user token" });
    }
    if (!itemId || !size || typeof quantity !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "itemId, size and numeric quantity are required" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || typeof cartData[itemId] !== "object") {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "cart updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// GET USER CART
const getUserCart = async (req, res) => {
  try {

    const { userId } = req.body;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ success: false, message: "Invalid user token" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
