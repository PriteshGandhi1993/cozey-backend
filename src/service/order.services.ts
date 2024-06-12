import { Database } from "../dataSources"
import { ComboItem } from "../entity/combo-item.entity";
import { Orders } from "../entity/orders.entity";

const comboItemRepository = Database.getInstance().getRepository(ComboItem);
const ordersRepository = Database.getInstance().getRepository(Orders);


export async function insertOrders(itemsToSave: any) {
    return ordersRepository.insert(itemsToSave);
}

export async function getOrders() {
    const response = await ordersRepository.find();
    console.log(response);
    return response;
}

export async function getTodaysOrder() {
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return ordersRepository.createQueryBuilder("order")
    .innerJoinAndSelect("order.user", 'users')
    .innerJoinAndSelect("order.combo", 'combos')
    .where("order.orderTime > :yesterday", { yesterday: yesterday })
    .andWhere("order.orderTime < :nextDay", { nextDay: nextDay })
    .getMany();
}


export async function getOrderItems() {
    try{
        let nextDay = new Date();
        nextDay.setDate(nextDay.setDate(nextDay.getDate() + 1));
        let yesterday = new Date();
        yesterday.setDate(yesterday.setDate(yesterday.getDate() - 1));
        let orders = await getTodaysOrder();
        let itemCombos = [];
        let items = new Map();
        for(let i = 0; i< orders.length; i++) {
            let itemCombo = await comboItemRepository.createQueryBuilder('comboItem')
            .innerJoinAndSelect('comboItem.combo', 'combo')
            .innerJoinAndSelect('comboItem.item', 'item')
            .where("comboItem.combo.id = :comboId", {comboId: orders[i]?.combo?.id})
            .getMany();
            itemCombos.push(...itemCombo);
        }

        for(let i=0; i< itemCombos.length; i++) {
            if(items.has(itemCombos[i]?.item?.id)) {
                let item = items.get(itemCombos[i]?.item?.id);
                item.quantity = item.quantity + 1;
                items.set(itemCombos[i]?.item?.id, item);
            } else {
                let obj = itemCombos[i]?.item;
                obj.quantity = 1;
                items.set(itemCombos[i]?.item?.id, obj);
            }
        }

        return Array.from(items.values());
    } catch(error: any) {
        throw new Error(error);
    }
}