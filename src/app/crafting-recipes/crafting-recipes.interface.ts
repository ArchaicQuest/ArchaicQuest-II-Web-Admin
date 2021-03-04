import { Item } from '../items/interfaces/item.interface';

export interface ICraftingRecipes {
    id: number;
    title: string;
    description: string;
    craftingMaterials: CraftingMaterials[];
    createdItem: Item;
}



export interface CraftingMaterials {
    material: string;
    quantity: number
}