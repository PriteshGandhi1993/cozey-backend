// import { Router } from "express";
import express from 'express';
import { create, getUser } from '../controller/user.controller';
export const userRouter = express.Router();

userRouter.post('/user', async (req, res) => {
    try{
        const createdUser = await create(req.body);
        res.statusCode = 200;
        res.send({
            data: createdUser
        });
    } catch(error: any) {
        res.statusCode = 400;
        res.send(error?.message);
    }
});

userRouter.get('/user', async (req, res) => {
    try{
        const user = await getUser();
        res.statusCode = 200;
        res.send({
            data: user
        });
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error
        });
    }
});
