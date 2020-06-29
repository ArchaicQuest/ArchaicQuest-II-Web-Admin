import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'effectLocationPipe' })
export class EffectLocationPipe implements PipeTransform {
    transform(location: number): string {

        switch (location) {
            case 0:
                return 'None';
            case 1 << 1:
                return 'Strength';
            case 1 << 2:
                return 'Dexterity';
            case 1 << 3:
                return 'Constitution';
            case 1 << 4:
                return 'Intelligence';
            case 1 << 5:
                return 'Wisdom';
            case 1 << 6:
                return 'Charisma';
            case 1 << 7:
                return 'Luck';
            case 1 << 8:
                return 'Hitpoints';
            case 1 << 9:
                return 'Mana';
            case 1 << 10:
                return 'Moves';
            case 1 << 11:
                return 'Armour';
            case 1 << 12:
                return 'Hit roll';
            case 1 << 13:
                return 'Saving spell';
            case 1 << 14:
                return 'Damage Roll';
            case 1 << 15:
                return 'Gender';
            case 1 << 16:
                return 'Age';
            case 1 << 17:
                return 'Weight';
            case 1 << 18:
                return 'Height';
            case 1 << 19:
                return 'Level';
            default:
                return '';
        }

    }
}
