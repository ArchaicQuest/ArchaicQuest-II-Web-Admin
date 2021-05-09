import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'skillTypesPipe' })
export class SkillTypePipe implements PipeTransform {
    transform(target: number): string {

        switch (target) {
            case 0:
                return 'None';
            case 1:
                return 'Affect';
            case 2:
                return 'Travel';
            case 4:
                return 'Creation';
            case 8:
                return 'Summon';
            case 16:
                return 'Passive';
            case 32:
                return 'Damage';
            case 64:
                return 'Area Effect';
            case 128:
                return 'Remove Effect';
            case 256:
                return 'Alter Object';
            case 512:
                return 'Group Spell';
            case 1024:
                return 'Animate Dead';
            default:
                return 'fail for ' + target;
        }

    }
}
