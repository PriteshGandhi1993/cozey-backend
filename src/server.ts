import "reflect-metadata";
import express from 'express';
import * as bodyParser from "body-parser";
import { itemRouter } from "./routes/items.routes"
import { eventsRouter } from "./routes/events.router";
import { comboRouter } from "./routes/combos.routes";
import { sendEventToUpdate } from "./controller/events.controller";
import { userRouter } from "./routes/user.routes";
import { orderRouter } from "./routes/orders.routes";
var cron = require('node-cron');

const app = express();
app.use(bodyParser.json());


app.use('/', itemRouter);

app.use('/', comboRouter);

app.use('/', eventsRouter)

app.use('/', userRouter)

app.use('/', orderRouter)

app.use('/events', eventsRouter);


cron.schedule('0 0 * * *', () => {
    console.log('Running a job at 12am');
    sendEventToUpdate();
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});
app.listen(3000);