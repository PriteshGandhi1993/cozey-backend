import { In } from "typeorm";
import { Database } from "../dataSources"
import { Items } from "../entity/items.entity";

const itemRepository = Database.getInstance().getRepository(Items)

export async function createItem(req: any) {
    let item = new Items();
    item.name = req?.name;
    if(!item.name) {
        throw new Error("Request is not valid, name is required");
    }
    const response = itemRepository.save(item);
    console.log(response);
    return response;
}

export async function getItems() {
    const response = await itemRepository.find();
    console.log(response);
    return response;
}

export async function findItemsByName(items: Array<string>) {
    return itemRepository.find({
        where: {
            name: In(items)
        }
    });
}
