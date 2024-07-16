const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add game to favourites
router.put("/add-game-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { gameid, id } = req.headers;
        const userData = await User.findById(id);
        const isGameFavourite = userData.favourites.includes(gameid);
        if (isGameFavourite) {
            return res.status(200).json({ message: "Game is already in favourites!" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: gameid } });
        return res.status(200).json({ message: "Game added to favourites" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// remove game from favourites
router.put("/remove-game-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { gameid, id } = req.headers;
        const userData = await User.findById(id);
        const isGameFavourite = userData.favourites.includes(gameid);
        if (isGameFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: gameid } });
        }
        
        return res.status(200).json({ message: "Game removed from favourites" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get Favourite games of a particular user
router.get("/get-favourite-games",authenticateToken,async(req,res)=>{
    try{
        const{id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouritegames = userData.favourites;
        return res.json({
            status: "Success",
            data: favouritegames,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

module.exports = router;
