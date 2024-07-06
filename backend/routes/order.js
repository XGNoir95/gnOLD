const router = require("express").Router();
const {authenticateToken} = require("./userAuth");
const Game = require("../models/game");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order",authenticateToken,async(req,res)=>{
    try{
        const{id} = req.headers;
        const{order} = req.body;
        for(const orderData of order){
            const newOrder = new Order({user: id, game: orderData._id});
            const orderDataFromDb = await newOrder.save();
            
            //saving order in user model
            await User.findByIdAndUpdate(id,{
                $push: {orders: orderDataFromDb._id},
            });

            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull:{cart: orderData._id},
            });
        }
        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error"});
    }
});

//get order history of a particular user
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate: {
                path: "game",
            }
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An Error Occurred"});
    }
});


//get all orders ---admin feature
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try{
        const userData = await Order.find()
        .populate({
            path: "game",
        })
        .populate({
            path: "user",
        })
        .sort({createdAt: -1 });
    return res.json({
        status:"Success",
        data: userData, 
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An Error Occurred"});
    }
});

//update order--admin
router.put("/update-status/:id", authenticateToken, async(req,res) =>{
    try{
        const{id} = req.params;
        await Order.findByIdAndUpdate(id,{ status: req.body.status});
        return res.json({
            status: "Success",
            message: "Status updated successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An Error Occurred"});
    }
});
module.exports = router;