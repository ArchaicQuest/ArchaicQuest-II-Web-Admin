import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'validTargetPipe' })
export class ValidTargetPipe implements PipeTransform {
    transform(target: number): string {

        switch (target) {
            case 0:
                return 'Ignore target';
            case 1 << 1:
                return 'Player in room';
            case 1 << 2:
                return 'Player anywhere';
            case 1 << 3:
                return 'Self in Fight';
            case 1 << 4:
                return 'Current target in Fight';
            case 1 << 5:
                return 'Self Only';
            case 1 << 6:
                return 'Not Self';
            case 1 << 7:
                return 'Inventory Item';
            case 1 << 8:
                return 'Room Item';
            case 1 << 9:
                return 'Item in the world';
            case 1 << 10:
                return 'Equipped Item';
            default:
                return '';
        }

    }
}
