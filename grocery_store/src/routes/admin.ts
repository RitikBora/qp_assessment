//Admin Routes

import express from 'express';
import bodyParser from 'body-parser'

const adminRoutes = express();




// Add grocery item route

adminRoutes.post("/addItem" , (req , res) =>
{
    const data = req.body;
    
    //data type id name price
})



// Fetch all items route

adminRoutes.get("/allItems" , (req , res) =>
{
    //send data;
})


//Update a Grocery Item

adminRoutes.put("/updateItem" , (req , res) =>
{

})






export default adminRoutes;