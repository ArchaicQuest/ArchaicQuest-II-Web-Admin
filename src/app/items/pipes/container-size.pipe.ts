import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'containerSize' })
export class ContainerSizePipe implements PipeTransform {
    transform(containerSize: number): string {

        switch (containerSize) {
            case 0:
                return 'Extra small';
            case 1:
                return 'Small';
            case 2:
                return 'Medium';
            case 3:
                return 'Large';
            case 4:
                return 'Extra Large';
            case 5:
                return 'Infinite';
            default:
                return '';
        }

    }
}
