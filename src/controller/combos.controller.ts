import { Database } from "../dataSources"
import { Combos } from "../entity/combos.entity";
import { findComboByName, getCombos, insertAndGetCombo, insertComboItems,  } from "../service/combos.service";
import { findItemsByName } from "../service/item.service";


export async function createCombo(req: any) {
    if(!req?.name) {
        throw new Error("Request is not valid, name is required");
    }
    if(!req?.items?.length) {
        throw new Error("Request is not valid, items are required");
    }
    let comboSave = await findComboByName(req?.name);
    if (!comboSave.length) {
        comboSave = await insertAndGetCombo({
            name: req?.name,
        });
        const items = await findItemsByName(req?.items);
        let itemsToSave = [];
        for(let i=0; i< items.length; i++) {
            // let comboItem = new ComboItem();
            // comboItem.combo = comboSave;
            // comboItem.item = items[i];
            let obj = {
                "combo": comboSave[0],
                "item": items[i]
            }

            itemsToSave.push(obj);
        }

        const comboItems = await insertComboItems(itemsToSave);
        console.log(comboItems);
    }

    return comboSave;
}

export async function getCombo() {
    return getCombos();
}