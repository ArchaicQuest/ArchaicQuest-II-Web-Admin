import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slotType' })
export class SlotTypePipe implements PipeTransform {
    transform(slotType: number): string {

        switch (slotType) {
            case 0:
                return 'Arms';
            case 1:
                return 'Body';
            case 2:
                return 'Face';
            case 3:
                return 'Feet';
            case 4:
                return 'Finger';
            case 5:
                return 'Floating';
            case 6:
                return 'Hands';
            case 7:
                return 'Head';
            case 8:
                return 'Held';
            case 9:
                return 'Legs';
            case 10:
                return 'Light';
            case 11:
                return 'Neck';
            case 12:
                return 'Shield';
            case 13:
                return 'Torso';
            case 14:
                return 'Waist';
            case 15:
                return 'Wielded';
            case 16:
                return 'Wrist';
            default:
                return '';
        }

    }
}
