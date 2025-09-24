const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://nomayenohin_db_user:iU5LXW0uRHKr4PfF@cluster0.8k7klrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
        const usersCollections = client.db('usersdb').collection("users");
        app.get('/users',async(req, res)=>{
            const cursor = usersCollections.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        app.post('/users',async (req, res)=>{
            console.log("data in server",req.body);
            const newUsers = req.body;
            const result = await usersCollections.insertOne(newUsers);
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send("Simple caurd Running")
})

app.listen(port, () => {
    console.log(`Simple CRUD Server Running on ,${port}`);
})


