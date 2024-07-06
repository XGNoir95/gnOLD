const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//put game to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {gameid,id} = req.headers;
        const userData = await User.findById(id);
        const isGameInCart = userData.cart.includes(gameid);

        if(isGameInCart) {
            return res.json({
                status: "Success",
                message: "Game is already in the cart",
            });
    }
    await User.findByIdAndUpdate(id,{
        $push:{
            cart: gameid
        },
    });

    return res.json({
        status: "Success",
        message: "Game added to cart successfully",
    });
}catch(error){
    console.log(error);
    return res.status(500).json({message: "An error occurred"});
}
});

//remove game from cart
router.put("/remove-game-from-cart/:gameid", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const {gameid} = req.params;
        await User.findByIdAndUpdate(id,{
            $pull:{
                cart: gameid
            }
        });
        return res.json({
            status: "Success",
            message: "Game removed from cart",
        });
        
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//get cart of a particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        const{id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

module.exports = router;