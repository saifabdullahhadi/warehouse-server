const express = require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port =process.env.port || 5000;
const app =express();

//middleware


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xosgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection=client.db('laptopGear').collection('product')

        app.get('/product',async(req,res)=>{
            const query={};
            const cursor=productCollection.find(query);
            const products=await cursor.toArray();
            res.send(products)
        })
    }
    finally{

    }
}
run().catch(console.dir)
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server Connected')
});
app.listen(port,()=>{
    console.log('Your Laptop is Ready',port);
})
