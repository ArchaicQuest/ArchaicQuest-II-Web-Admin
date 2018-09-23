import { Item } from "./interfaces/item.interface";
import { ItemType } from "./interfaces/item-type.interface";

export interface ItemState {
    items: Item[];
    itemTypes: ItemType[];
    itemSlots: ItemType[];
    armourTypes: ItemType[];
    weaponTypes: ItemType[];
    damageTypes: ItemType[];
    attackTypes: ItemType[];
    flags: ItemType[];
    loading: boolean;
}
