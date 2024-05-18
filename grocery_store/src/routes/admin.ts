//Admin Routes

import express from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthenticationMiddleware from '../middlewares/adminAuthentication';
import {z} from 'zod';

const adminRoutes = express();
const prismaClient = new PrismaClient();



//admin session check before routes
adminRoutes.use(adminAuthenticationMiddleware);


const addInput = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number().optional()
});

const updateInput = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number()
});

const manageInput = z.object({
    quantity : z.number()
})



// Add grocery item route

adminRoutes.post("/addItem" , async (req , res) =>
{
    const data = req.body;

    const {success} = addInput.safeParse(data); // input validation

    if(!success)
    {
        return res.status(400).json({message : "incorrect inputs"});
    }


    try
    {
        const inputData = {
            name : data.name,
            price : data.price,
            quantity : 10
        };

        if(data.quantity !== undefined)
        {
            inputData.quantity = data.quantity;
        }
        
        const item = await prismaClient.grocery_items.create({
        data : {
            name : data.name,
            price : data.price,
            quantity : data.quantity
        }
        });
        
        return res.status(200).send({message : "item added successfully" , item : item});
    }catch(err)
    {
        console.log(err);
        return res.status(500).json({message : "error occured while adding item"});
    }    
})



// Fetch all items route

adminRoutes.get("/allItems" , async (req , res) =>
{
    try
    {
        const items = await prismaClient.grocery_items.findMany();
         return res.status(200).send({message : "item added successfully" , items : items});

    }catch(err)
    {
        return res.status(500).json({message : "error occured while fetching items"});
    }
})


//Update a Grocery Item

adminRoutes.put("/updateItem/:id" , async(req , res) =>
{
    const item_id = Number(req.params.id);
    const data = req.body;

    const {success} = updateInput.safeParse(data); //valdiating inputs

    
    if(item_id === undefined)
    {
        return res.status(400).json({message : "item id not found"});
        
    }

     if(!success)
    {
        return res.status(400).json({message : "incorrect inputs"});
    }
    
    try
    {
        const updatedItem = await prismaClient.grocery_items.update({
        where: {
            id : item_id
        },
        data : {
            name : data.name,
            price: data.price,
            quantity : data.quantity
        }
        });

          return res.status(200).send({message : "item updated successfully" , item : updatedItem});
    }catch(err)
    {
        return res.status(500).json({message : "error occured while updating item"});

    }
})


//manage levels(Update quantity)

adminRoutes.put("/updateQuantity/:id" , async(req , res) =>
{
    const item_id = Number(req.params.id);
    const data = req.body;

    const {success} = manageInput.safeParse(data); //valdiating inputs

       if(!success)
    {
        return res.status(400).json({message : "incorrect inputs"});
    }
    
    if(item_id === undefined)
    {
        return res.status(400).json({message : "item id not found"});
        
    }

    try
    {
       await  prismaClient.grocery_items.update({
        where : {
            id : item_id
        },
        data: {
            quantity : data.quantity
        }
        });
          return res.status(200).send({message : "item quantity updated successfully"});

    }catch(err)
    {
        return res.status(500).json({message : "error occured while updating quantity"});
    }
})





export default adminRoutes;