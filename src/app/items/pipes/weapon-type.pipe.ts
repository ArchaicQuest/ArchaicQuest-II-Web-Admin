import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'weaponType' })
export class WeaponTypePipe implements PipeTransform {
    transform(weaponType: number): string {

        switch (weaponType) {
            case 0:
                return 'Arrow';
            case 1:
                return 'Axe';
            case 2:
                return 'Blunt';
            case 3:
                return 'Bolt';
            case 4:
                return 'Bows';
            case 5:
                return 'Crossbow';
            case 6:
                return 'Exotic';
            case 7:
                return 'Flail';
            case 8:
                return 'Hand to hand';
            case 9:
                return 'Long blade';
            case 10:
                return 'Polearm';
            case 11:
                return 'Short blade';
            case 12:
                return 'Spear';
            case 13:
                return 'Staff';
            case 14:
                return 'Whip';
            default:
                return '';
        }

    }
}