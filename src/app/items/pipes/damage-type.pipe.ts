import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'damageType' })
export class DamageTypePipe implements PipeTransform {
    transform(damageType: number): string {

        switch (damageType) {
            case 0:
                return 'None';
            case 1:
                return 'Acidic';
            case 2:
                return 'Blast';
            case 3:
                return 'Chill';
            case 4:
                return 'Divine';
            case 5:
                return 'Flame';
            case 6:
                return 'Flaming';
            case 7:
                return 'Freezing';
            case 8:
                return 'Poisoned';
            case 9:
                return 'Shocking';
            case 10:
                return 'Stun';
            case 11:
                return 'Wrath';
            default:
                return '';
        }

    }
}
