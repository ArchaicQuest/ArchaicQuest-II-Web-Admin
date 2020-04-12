import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'generateMoves' })
export class MovesFormulaPipe implements PipeTransform {
    transform(level: number, dex: number): number {

        return Math.ceil((dex * 1.5) + (level * dex));

    }
}
