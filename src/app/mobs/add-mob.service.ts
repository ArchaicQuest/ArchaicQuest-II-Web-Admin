import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gender } from '../characters/interfaces/gender.interface';
import { GenderEnum } from '../characters/enums/gender.enum';
import { Race } from '../characters/interfaces/race.interface';
import { RaceEnums } from '../characters/enums/race.enums';

import { ClassEnums } from '../characters/enums/class.enums';
import { Class } from '../characters/interfaces/class.interface';
import { Alignment } from '../characters/interfaces/alignment.interface';
import { AlignmentEnums } from '../characters/enums/alignment.enum';
import { Mob } from './interfaces/mob.interface';
import { Status } from '../characters/interfaces/status.interface';

@Injectable({
  providedIn: 'root'
})
/*
  todo
  ----
  money
  inventory / Worn / wielded items
  active affects
  emotes
*/
export class MobService {
  private host = 'http://localhost:57814/api/';
  private saveMobUrl = `${this.host}mob/PostMob`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  public addMobForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    gender: ['', Validators.required],
    race: ['', Validators.required],
    class: ['', Validators.required],
    alignment: ['', Validators.required],
    status: [1, Validators.required],
    attackType: ['', Validators.required],
    description: ['', Validators.required],
    greetMessage: [''],
    emotes: new FormGroup({}),
    level: ['', [Validators.min(1), Validators.max(99)]],
    stats: new FormGroup({
      hitPoints: new FormControl('', [Validators.min(1), Validators.max(99)]),
      manaPoints: new FormControl('', [Validators.min(1), Validators.max(99)]),
      movePoints: new FormControl('', [Validators.min(1), Validators.max(99)])
    }),
    attributes: new FormGroup({
      strength: new FormControl('', [Validators.min(1), Validators.max(99)]),
      dexterity: new FormControl('', [Validators.min(1), Validators.max(99)]),
      constitution: new FormControl('', [
        Validators.min(1),
        Validators.max(99)
      ]),
      wisdom: new FormControl('', [Validators.min(1), Validators.max(99)]),
      intelligence: new FormControl('', [
        Validators.min(1),
        Validators.max(99)
      ]),
      charisma: new FormControl('', [Validators.min(1), Validators.max(99)])
    })
  });

  saveMob(mob: Mob) {
    console.log('post this ', mob);
    return this.http.post(this.saveMobUrl, JSON.stringify(mob), {
      headers: this.headers,
      responseType: 'text'
    });
  }

  getAddMobForm() {
    return this.addMobForm;
  }

  getGender(): Gender[] {
    return [
      {
        name: 'None',
        id: GenderEnum.None
      },
      {
        name: 'Male',
        id: GenderEnum.Male
      },
      {
        name: 'Female',
        id: GenderEnum.Female
      }
    ];
  }

  getRaces(): Race[] {
    return [
      {
        name: 'Human',
        id: RaceEnums.Human,
        description: `Humans are highly adaptable and the most common race in the world.
            They come in a wide range of skin, eye and hair colours as well as different shapes and sizes.`
      },
      {
        name: 'Elf',
        id: RaceEnums.Elf,
        description: `Elves are shorter and slimmer than humans, they are also more in tune with nature and magic.
             They have an innate ability of Sneaking, Infrasion and resistance to charm spells.`
      },
      {
        name: 'Dark Elf',
        id: RaceEnums.DarkElf,
        description: `Dark Elves are identical to their elven brethren except their skin ranges from dark pale blue to black.
             They too have an innate ability of Sneaking, Infrasion and resistance to charm spells.`
      },
      {
        name: 'Dwarf',
        id: RaceEnums.Dwarf,
        description: `Dwarves are a short muscular humanoids who prefer the mountains and the underdark where they enjoy
             digging for gold. A lot of dwarves do venture out of the caves and can be found in human settlements in the local
              tavern with a mug of Ale. They are powerful Warriors and Clerics`
      },
      {
        name: 'Mau',
        id: RaceEnums.Mau,
        description: `Mau, Cat like humanoid race. Info coming soon`
      },
      {
        name: 'Tlaloc',
        id: RaceEnums.Tlaloc,
        description: `Tlaloc, Reptilian lizard like humanoid race. Info coming soon`
      }
    ];
  }

  getClasses(): Class[] {
    return [
      {
        name: 'Fighter',
        id: ClassEnums.Fighter,
        description: `Warriors are able to use any weapon and armour effectively along side their wide range of lethal and defensive combat skills.
            They have no need for mana, relying on their sheer strength and endurance alone to overcome opponents.
            Important attributes for Warriors are Strength, Dexterity and Constitution Every race can train to be an effective warrior.
            For beginners we recommend you pick a Human Warrior.`
      },
      {
        name: 'Thief',
        id: ClassEnums.Thief,
        description: `Rogues are masters at the arts of remaining hidden and delivering devastating blows from the shadows before fleeing
             into the darkness once more. They are strong in combat but can't handle the same amount of damage as a warrior.
             They are also skilled lock and pocket pickers, can set or disarm traps and know how to apply poison to their blade.
              Rogues are a versatile class. Important attributes for Mages are Dexterity, Constitution and Strength Every race can train
              to be an rogue but Mau are one of the best due to their agile nature.`
      },
      {
        name: 'Cleric',
        id: ClassEnums.Cleric,
        description: `Cleric power comes from the gods they worship, stronger the devotion, stronger the power,
            Clerical spells focus on healing and preserving life rather than destroy it but don't be fooled clerics
             know powerful offensive spells to rival any mage. They can also wear any armour just like a warrior.
             Important attributes for Clerics are Wisdom, Intelligence and Constitution
              Every race can train to be a cleric but Dwarfs are one of the best.`
      },
      {
        name: 'Mage',
        id: ClassEnums.Mage,
        description: `Mages are the most feared across the realm due to their devastating spells and power.
             The road to such power is a hard, slow journey. Mages struggle more than other classes in melee combat
              because They spent years studying magic and how to hurl a ball of fire towards their opponent instead
               of training for physical combat. This makes mages relatively weak at the beginning of their training
                but this changes however when a they have mastered the arts of magic. Important attributes for Mages
                 are Intelligence, Wisdom and Dexterity Every race can train to be a mage but Elves are the best.`
      }
    ];
  }

  getAlignment(): Alignment[] {
    return [
      {
        name: 'Lawful Good',
        id: AlignmentEnums.LawfulGood
      },
      {
        name: 'Neutral Good',
        id: AlignmentEnums.NeutralGood
      },
      {
        name: 'Chaotic Good',
        id: AlignmentEnums.ChaoticGood
      },
      {
        name: 'Lawful Neutral',
        id: AlignmentEnums.LawfulNeutral
      },
      {
        name: 'Neutral Good',
        id: AlignmentEnums.Neutral
      },
      {
        name: 'Chaotic Neutral',
        id: AlignmentEnums.ChaoticNeutral
      },
      {
        name: 'Lawful Evil',
        id: AlignmentEnums.LawfulEvil
      },
      {
        name: 'Neutral Evil',
        id: AlignmentEnums.NeutralEvil
      },
      {
        name: 'Chaotic Evil',
        id: AlignmentEnums.ChaoticEvil
      }
    ];
  }

  getStatus(): Status[] {
    return [{
      name: 'Sitting',
      id: 1,
    },
    {
      name: 'Standing',
      id: 2,
    },
    {
      name: 'Sleeping',
      id: 3,
    },
    {
      name: 'Fighting',
      id: 4,
    },
    {
      name: 'Resting',
      id: 5,
    },
    {
      name: 'Incapitated',
      id: 6,
    },
    {
      name: 'Dead',
      id: 7,
    },
    {
      name: 'Ghost',
      id: 8,
    },
    {
      name: 'Busy',
      id: 9,
    },
    {
      name: 'Floating',
      id: 10,
    },
    {
      name: 'Mounted',
      id: 11,
    },
    {
      name: 'Stunned',
      id: 12,
    }]
  }

  getDefaultAttackType(): Status[] {
    return [{
      name: 'Punch',
      id: 1,
    },
    {
      name: 'Pound',
      id: 2,
    },
    {
      name: 'Bite',
      id: 3,
    },
    {
      name: 'Charge',
      id: 4,
    },
    {
      name: 'Peck',
      id: 5,
    },
    {
      name: 'Headbutt',
      id: 6,
    }]
  }

  generateRandomStat(): number {
    const min = 12;
    const max = 20;
    return Math.floor(Math.random() * (max - min) + min);
  }
}
