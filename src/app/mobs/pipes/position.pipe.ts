import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'position' })
export class PositionPipe implements PipeTransform {
    transform(position: number): string {

        switch (position) {
            case 0:
                return 'Standing';
            case 1:
                return 'Sitting';
            case 2:
                return 'Sleeping';
            case 3:
                return 'Fighting';
            case 4:
                return 'Resting';
            case 5:
                return 'Incapitated';
            case 6:
                return 'Dead';
            case 7:
                return 'Ghost';
            case 8:
                return 'Busy';
            case 9:
                return 'Floating';
            case 10:
                return 'Standing';
            case 11:
                return 'Stunned';
            default:
                return 'Standing';
        }

    }
}
