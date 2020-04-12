import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'generateMana' })
export class ManaFormulaPipe implements PipeTransform {
    transform(level: number, int: number): number {

        return Math.ceil((int * 1.5) + (level * int));

    }
}
