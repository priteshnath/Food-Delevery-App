import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
    }else{
        cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData})
    res.json({succes: true, message : "Added to Cart"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding item to cart" });
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, meesage: "Removed from Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false, meesage: "Error"})
    }
};

// FETCH USER CART DATA
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"});
    }
};

export { addToCart, removeFromCart, getCart };
