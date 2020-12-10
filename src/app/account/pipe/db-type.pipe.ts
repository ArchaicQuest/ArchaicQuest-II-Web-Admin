import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DBType' })
export class DBTypePipe implements PipeTransform {
    transform(collectionId: number): string {

        switch (collectionId) {
            case 0:
                return 'Account';
            case 1:
                return 'Alignment';
            case 2:
                return 'Area';
            case 3:
                return 'AttackType';
            case 4:
                return 'Class';
            case 5:
                return 'Items';
            case 6:
                return 'Mobs';
            case 7:
                return 'Players';
            case 8:
                return 'Race';
            case 9:
                return 'Room';
            case 10:
                return 'Skill';
            case 11:
                return 'Status';
            case 12:
                return 'Config';
            case 13:
                return 'Socials';
            case 14:
                return 'Quests';
            case 15:
                return 'Users';
            case 16:
                return 'Log';
            default:
                return '';
        }

    }
}
