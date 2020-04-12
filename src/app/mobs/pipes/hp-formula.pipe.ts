import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'generateHp' })
export class HPFormulaPipe implements PipeTransform {
    transform(level: number, con: number): number {

        return Math.ceil((con * 1.5) + (level * con));

    }
}
