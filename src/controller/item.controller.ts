import { Database } from "../dataSources"
import { Items } from "../entity/items.entity";
import { createItem, getItems } from "../service/item.service";


export async function create(req: any) {
    return createItem(req);
}

export async function getItem() {
    const response = await getItems();
    console.log(response);
    return response;
}