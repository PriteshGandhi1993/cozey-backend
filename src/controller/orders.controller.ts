import { Database } from "../dataSources"
import { Combos } from "../entity/combos.entity";
import { findComboByName } from "../service/combos.service";
import { findItemsByName } from "../service/item.service";
import { getOrderItems, getTodaysOrder, insertOrders } from "../service/order.services";
import { getUserById } from "../service/user.service";
import { getUser } from "./user.controller";


export async function createOrder(req: any) {
    if(!req?.userId) {
        throw new Error("Request is not valid, userId is required");
    }
    if(!req?.orders?.length) {
        throw new Error("Request is not valid, orders are required");
    }
    let orders = [];
    let user = await getUserById(req.userId);
    for(let i=0; i< req.orders.length; i++) {
        let order = req.orders[i];
        if(order.combo) {
            let combo = await findComboByName(order.combo);
            if(combo) {
                orders.push({
                    combo: combo[0].id,
                    quantity: order.quantity ? order.quantity : 1,
                    orderTime: new Date(),
                    user: user[0].id
                });
            }
        } 
    }

    if(orders.length)
    {    
        const saveOrders = insertOrders(orders);
        return saveOrders;
    } else {
        throw new Error("Invalid orders");
    }

    // const comboSave = await findComboByName(req?.name);
    // const items = await findItemsByName(req?.items);
    // let itemsToSave = [];
    // for(let i=0; i< items.length; i++) {
    //     // let comboItem = new ComboItem();
    //     // comboItem.combo = comboSave;
    //     // comboItem.item = items[i];
    //     let obj = {
    //         "combo": comboSave[0],
    //         "item": items[i]
    //     }

    //     itemsToSave.push(obj);
    // }

    // const comboItems = await insertCombos(itemsToSave);
    // console.log(comboItems);
    // return comboItems;
}

export async function getOrders() {
    try{
        return getTodaysOrder();
    } catch(error) {
        throw new Error("Error"+ error);
    }
}

export async function getItems() {
    return getOrderItems();
}