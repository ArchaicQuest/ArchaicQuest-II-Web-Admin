import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'validTargetPipe' })
export class ValidTargetPipe implements PipeTransform {
    transform(target: number): string {


        switch (target) {
            case 0:
                return 'Ignore target';
            case 1:
                return 'Player in room';
            case 2:
                return 'Player anywhere';
            case 4:
                return 'Self in Fight';
            case 8:
                return 'Current target in Fight';
            case 16:
                return 'Self Only';
            case 32:
                return 'Not Self';
            case 64:
                return 'Inventory Item';
            case 128:
                return 'Room Item';
            case 256:
                return 'Item in the world';
            case 512:
                return 'Equipped Item';
            default:
                return 'fail for ' + target;
        }

    }
}
