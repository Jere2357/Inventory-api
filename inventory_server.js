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

//create a document
// async function createInventory() {
//     const inventories = new Inventories({
//         name: 'Zonrox',
//         qty: 2,
//         amount: 500,
//         updated_by: 'Jeremiah'
//     })

//     const result = await inventories.save();
//     console.log(result);
// }
// createInventory();

// Get requests
    app.get('/inventories', async(req, res) => {
        Inventories.find({}, (error, inventories) => {
            let inventoryMap = {};

            inventories.forEach( (inventory) => {
                inventoryMap[inventory._id] = inventory;
            })
            res.send(inventoryMap);
        });
    });

// Post requests
    app.post('/inventories',  async(req, res) => {
        const inventory = new Inventories({
            name: req.body.name,
            qty: req.body.qty,
            amount: req.body.amount,
            updated_by: req.body.updated_by
        })
        
        const result = await inventory.save();
        res.send(result);
    });

//Port

const port = process.env.PORT || 3001;


app.listen( port, () => {
    return(
        console.log(`It is listening to port ${port}`)
    )
} )