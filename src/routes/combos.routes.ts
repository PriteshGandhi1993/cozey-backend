// import { Router } from "express";
import express from 'express';
import { createCombo, getCombo } from '../controller/combos.controller';
export const comboRouter = express.Router();

comboRouter.post('/combos', async (req, res) => {
    try{
        const itemCreated = await createCombo(req.body);
        res.statusCode = 200;
        res.send({
            data: itemCreated
        });
    } catch(error: any) {
        res.statusCode = 400;
        res.send(error?.message);
    }
});

comboRouter.get('/combos', async (req, res) => {
    try{
        const itemCreated = await getCombo();
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
