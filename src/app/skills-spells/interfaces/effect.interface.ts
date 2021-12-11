
export interface Effect {
    name: string;
    duration: number;
    modifier: EffectModifier;
    accumulate: boolean;
    location: SkillEffectLocation;
}

export interface EffectModifier {
    hitRoll?: number;
    damRoll?: number;
    saves?: number;
    hp?: number;
    mana?: number;
    moves?: number;
    spellDam?: number;
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
}

export enum SkillEffectLocation {
    Strength,
    Dexterity,
    Constitution,
    Wisdom,
    Intelligence,
    Charisma,
    HitPoints,
    Mana,
    Moves,
    HitRoll,
    DamRoll,
    Invis,
    DetectInvis,
    Blind,
    Flying,
    Floating,
    Infravision,
    Poison,
    ArmorClass,
    Curse,
    DetectAlign,
    DetectEvil,
    DetectNeutral,
    DetectGood,
    DetectSneak,
    DetectHidden,
    ProtectEvil,
    ProtectNeutral,
    ProtectGood,
    Sanctuary,
    Sleep,
    Waterwalk,
    Hidden,
    Sneak,
    NonDetect,
    Charm,
    Silence,
    Darkness,
    Dispell,
    Frozen,
    Burnt,
    Undead,
    Berserk
}

export enum EffectLocation {
    None = 0,
    Strength = 1 << 0,
    Dexterity = 1 << 1,
    Constitution = 1 << 2,
    Intelligence = 1 << 3,
    Wisdom = 1 << 4,
    Charisma = 1 << 5,
    Luck = 1 << 6,
    Hitpoints = 1 << 7,
    Mana = 1 << 8,
    Moves = 1 << 9,
    Armour = 1 << 10,
    HitRoll = 1 << 11,
    SavingSpell = 1 << 12,
    DamageRoll = 1 << 13,
    Gender = 1 << 14,
    Age = 1 << 15,
    Weight = 1 << 16,
    Height = 1 << 17,
    Level = 1 << 18,
}
