import express from 'express';
import { addClient } from '../service/events.service';
export const eventsRouter = express.Router();

eventsRouter.get('/subscribe', async (request, response) => {
    addClient(request, response);
});
