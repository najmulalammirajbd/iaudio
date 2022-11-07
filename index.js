const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfgke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const islavosongs = client.db("islavoaudio").collection("islavomusic");
    const islavoprimiumsongs = client.db("islavoaudio").collection("islavopremium");
    const islavoshowss = client.db("islavoaudio").collection("islavoshow");

        app.get( '/allimusics', async (req, res) =>{
            const cursor = islavosongs.find({});
            const allimusics = await cursor.toArray();
            res.send(allimusics);
        });
        app.post('/islavomusics', async (req, res) => {
            const imusics = req.body;
            const result = await islavosongs.insertOne(imusics);
            console.log(result);
            res.send(imusics);
        })
        //....................
    
        app.get( '/alliprimiums', async (req, res) =>{
            const cursor = islavoprimiumsongs.find({});
            const alliprimiums = await cursor.toArray();
            res.send(alliprimiums);
        });
        app.post('/islavoprimiums', async (req, res) => {
            const iprimiums = req.body;
            const result = await islavoprimiumsongs.insertOne(iprimiums);
            console.log(result);
            res.send(iprimiums);
        });
    
    
        //....................
    
        app.get( '/allishows', async (req, res) =>{
            const cursor = islavoshowss.find({});
            const allishows = await cursor.toArray();
            res.send(allishows);
        });
        app.post('/islavoshows', async (req, res) => {
            const ishow = req.body;
            const result = await islavoshowss.insertOne(ishow);
            console.log(result);
            res.send(ishow);
        });

    }
    finally{

    }
} 
run().catch(err => console.error(err));

app.get('/', (req, res) =>{
    res.send('islavo audio server is running');
})

app.listen(port, () =>{
    console.log(`ema john running on: ${port}`)
})