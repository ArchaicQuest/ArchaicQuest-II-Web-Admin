import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'generateWeightAllowance' })
export class EncumbranceFormulaPipe implements PipeTransform {
    transform(str: number): number {

        return Math.ceil(str * 11);

    }
}
