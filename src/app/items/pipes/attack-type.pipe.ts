import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'attackType' })
export class AttackTypePipe implements PipeTransform {
    transform(attackType: number): string {

        switch (attackType) {
            case 0:
                return 'Charge';
            case 1:
                return 'Chop';
            case 2:
                return 'Claw';
            case 3:
                return 'Cleave';
            case 4:
                return 'Crush';
            case 5:
                return 'Pierce';
            case 6:
                return 'Pound';
            case 7:
                return 'Punch';
            case 8:
                return 'Scratch';
            case 9:
                return 'Slap';
            case 10:
                return 'Slash';
            case 11:
                return 'Slice';
            case 12:
                return 'Smash';
            case 13:
                return 'Stab';
            case 14:
                return 'Thrust';
            case 15:
                return 'Thwack';
            case 16:
                return 'Whip';
            default:
                return '';
        }

    }
}
