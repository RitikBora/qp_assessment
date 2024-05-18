//User Routes

import express from 'express';
import { PrismaClient } from '@prisma/client';
import userAuthenticationMiddleware from '../middlewares/userAuthentication';

const userRoutes = express();
const prismaClient = new PrismaClient();


//user session check before user routes
userRoutes.use(userAuthenticationMiddleware);

//fetch all items
userRoutes.get("/items" , async(req , res) =>
{
    try
    {
        const availableItems =  await prismaClient.grocery_items.findMany({
        where : {
            quantity : {
                gt : 0
            }
        }
        });
        return res.status(200).json({items : availableItems});
    }catch(err)
    {
        return res.status(500).json({message : "error occured while fetching items"});
    }
})


//order items
userRoutes.post("/order", async (req, res) => {
    const { ids } = req.body;

    try {
        for (const id of ids) {
            const fetchedItem = await prismaClient.grocery_items.findFirst({
                where: {
                    id: id
                }
            });

            if (fetchedItem && fetchedItem?.quantity > 0) {
                await prismaClient.grocery_items.update({
                    where: {
                        id: id
                    },
                    data: {
                        quantity: {
                            decrement: 1
                        }
                    }
                });
            } else {
                return res.status(500).json({ message: "Some of the items ordered are out of stock. Order unsucessfull" });
            }
        }

        return res.status(200).send({ message: "order placed successfully" });
    } catch (err) {
        return res.status(500).send({ message: "error occurred while placing order" });
    }
});


export default userRoutes;