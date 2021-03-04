import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemType' })
export class ItemTypePipe implements PipeTransform {
    transform(itemType: number): string {

        switch (itemType) {
            case 0:
                return 'Armour';
            case 1:
                return 'Book';
            case 2:
                return 'Container';
            case 3:
                return 'Drink';
            case 4:
                return 'Food';
            case 5:
                return 'Forage';
            case 6:
                return 'Key';
            case 7:
                return 'Light';
            case 8:
                return 'LockPick';
            case 9:
                return 'Potion';
            case 10:
                return 'Repair';
            case 11:
                return 'Weapon';
            case 12:
                return 'Seating';
            case 13:
                return 'Inanimate';
            case 14:
                return 'Money';
            case 15:
                return 'Portal';
            case 16:
                return 'Crafting';
            case 17:
                return 'Material';

            default:
                return '';
        }

    }
}
