import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'effectLocationPipe' })
export class EffectLocationPipe implements PipeTransform {
    transform(location: number): string {
        console.log(location);
        switch (location) {
            case 0:
                return 'None';
            case 1:
                return 'Strength';
            case 2:
                return 'Dexterity';
            case 4:
                return 'Constitution';
            case 8:
                return 'Intelligence';
            case 16:
                return 'Wisdom';
            case 32:
                return 'Charisma';
            case 64:
                return 'Luck';
            case 128:
                return 'Hitpoints';
            case 256:
                return 'Mana';
            case 512:
                return 'Moves';
            case 1024:
                return 'Armour';
            case 2048:
                return 'Hit roll';
            case 4096:
                return 'Saving spell';
            case 8192:
                return 'Damage Roll';
            case 16384:
                return 'Gender';
            case 32768:
                return 'Age';
            case 65536:
                return 'Weight';
            case 131072:
                return 'Height';
            case 2622144:
                return 'Level';
            default:
                return '';
        }

    }
}
