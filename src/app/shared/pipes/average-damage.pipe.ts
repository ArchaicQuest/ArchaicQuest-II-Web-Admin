import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'averageDamage' })
export class AverageDamagePipe implements PipeTransform {
    transform(minDam: number, maxDam: number): number {

        function getRandomInt(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        let diceSum = 0;
        let average = 0;

        for (let i = 1; i <= 100; i++) {
            diceSum += getRandomInt(minDam, maxDam);
        }

        average += diceSum / 100;
        return Math.floor(average);
    }
}