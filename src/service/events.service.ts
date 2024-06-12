import { Request, Response } from "express";

let clients: any = [];

export async function addClient(req: Request, res: Response) {
    const clientId = Date.now();

    const newClient = {
      id: clientId,
      res,
    };
  
    clients.push(newClient);
  
    req.on("close", () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter((client: any) => client.id !== clientId);
    });
}

export async function sendEvent() {
    clients.forEach((client: any) => client.response.write(`data`));    
}