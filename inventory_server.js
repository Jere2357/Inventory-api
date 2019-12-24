const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inventory',
    {
        useNewUrlParser: true
    }
)
.then(() => console.log('Connected to mongodb....'))
.catch( err => console.error('Could not connect to MongoDB.....', err));

const inventorySchema = new mongoose.Schema({
    name: String,
    qty: Number,
    amount: Number,
    date: {
        type: Date,
        default: Date.now
    },
    updated_by: String
});

//create a model for inventories
const Inventories = mongoose.model('inventories', inventorySchema);

// Get requests
    app.get('/inventories', async(req, res) => {
        try{
            Inventories.find({}, (error, inventories) => {
                let inventoryMap = {};
    
                inventories.forEach( (inventory) => {
                    inventoryMap[inventory._id] = inventory;
                })
                res.send(inventoryMap);
            });
        }catch(err){
            res.status(500).send(err);
        }
    });

    app.get('/inventories/:_id', async(req, res) => {
        try{
            const inventory = await Inventories.find(inventory_map => {
                inventory_map._id === req.params._id;
            })
            if (!inventory){
                res.status(404).send('The inventory with the given id was not found');
            } else {
                res.send(inventory);
            }
        }catch(err){
            res.status(500).send('bad request');
        }
    })

// Post requests
    app.post('/inventories',  async(req, res) => {
        try{
            const inventory = new Inventories({
                name: req.body.name,
                qty: req.body.qty,
                amount: req.body.amount,
                updated_by: req.body.updated_by
            })
            
            const result = await inventory.save();
            res.send(result);
        }catch(err){
            res.status(500).send(err);
        }
    });

//Port

const port = process.env.PORT || 3001;


app.listen( port, () => {
    return(
        console.log(`It is listening to port ${port}`)
    )
} )