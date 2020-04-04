import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'armourType' })
export class ArmourTypePipe implements PipeTransform {
    transform(armourType: number): string {

        switch (armourType) {
            case 0:
                return 'Cloth';
            case 1:
                return 'Leather';
            case 2:
                return 'Studded Leather';
            case 3:
                return 'Chain Mail';
            case 4:
                return 'Plate mail';
            default:
                return '';
        }

    }
}
