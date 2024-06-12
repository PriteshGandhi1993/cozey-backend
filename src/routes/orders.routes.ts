// import { Router } from "express";
import express from 'express';
import { createOrder, getItems, getOrders } from '../controller/orders.controller';
export const orderRouter = express.Router();

orderRouter.post('/orders', async (req, res) => {
    try{
        const itemCreated = await createOrder(req.body);
        res.statusCode = 200;
        res.send({
            data: itemCreated
        });
    } catch(error: any) {
        res.statusCode = 400;
        res.send(error?.message);
    }
});

orderRouter.get('/orders/allOrders', async (req, res) => {
    try{
        const itemCreated = await getOrders();
        res.statusCode = 200;
        res.send({
            data: itemCreated
        });
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error
        });
    }
});

orderRouter.get('/orders/allItems', async (req, res) => {
    try{
        const itemCreated = await getItems();
        res.statusCode = 200;
        res.send({
            data: itemCreated
        });
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error
        });
    }
});
