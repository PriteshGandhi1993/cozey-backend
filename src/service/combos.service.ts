import { Database } from "../dataSources"
import { Items } from "../entity/items.entity";
import { ComboItem } from "../entity/combo-item.entity";
import { Combos } from "../entity/combos.entity";
import { In } from "typeorm";

const comboRepository = Database.getInstance().getRepository(Combos);
const comboItemRepository = Database.getInstance().getRepository(ComboItem);
const itemRepository = Database.getInstance().getRepository(Items);


export async function insertComboItems(itemsToSave: any) {
    return comboItemRepository.insert(itemsToSave);
}

export async function insertAndGetCombo(itemsToSave: any) {
    await comboRepository.insert(itemsToSave);
    return findComboByName(itemsToSave.name);
}

export async function getCombos() {
    const response = await comboRepository.find();
    console.log(response);
    return response;
}

export async function findComboByName(name: string) {
    return comboRepository.find({
        where: {
           name: name 
        }
    });
}