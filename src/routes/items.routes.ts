// import { Router } from "express";
import express from 'express';
import { create, getItem } from '../controller/item.controller'
export const itemRouter = express.Router();

itemRouter.post('/items', async (req, res) => {
    try{
        const itemCreated = await create(req.body);
        res.statusCode = 200;
        res.send({
            data: itemCreated
        });
    } catch(error: any) {
        res.statusCode = 400;
        res.send(error?.message);
    }
});

itemRouter.get('/items', async (req, res) => {
    try{
        const itemCreated = await getItem();
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
