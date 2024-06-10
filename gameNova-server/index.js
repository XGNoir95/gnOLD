const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')


//middleware -- makes connection to front end
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the start of GameNova!')
})

//mongodb-configuration
//user-pass-20220104046

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://game_nova_mern:20220104046@atlascluster.xjwewls.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a collection of documents
    const gameCollections = client.db("GameInventory").collection("games");

    // inserting a game to the db: post method

    app.post("/upload-game", async(req,res) =>{
      const data = req.body;
      const result = await gameCollections.insertOne(data);
      res.send(result);
    })

    //get all games from database
    // app.get("/all-games",async(req,res)=>{
    //   const games =  gameCollections.find();
    //   const result = await games.toArray();
    //   res.send(result);
    // })

    //update a game data: patch or update methods
    app.patch("/game/:id", async(req,res)=>{
      const id = req.params.id;
      //console.log(id)
      const updateGameData = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};

      const updateDoc = {
        $set:{
          ...updateGameData
        }
      }
      //update
      const result = await gameCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    //delete a game data
    app.delete("/game/:id", async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await gameCollections.deleteOne(filter);
      res.send(result);
    })

    //find by category
    app.get("/all-games", async(req,res)=>{
      let query = {};
      if(req.query?.category){
        query = {category: req.query.category}
      }
      const result = await gameCollections.find(query).toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})