export enum validTargets {
    TargetIgnore = 0,
    TargetPlayerRoom = 1 << 0,
    TargetPlayerWorld = 1 << 1,
    TargetFightSelf = 1 << 2,
    TargetFightVictim = 1 << 3,
    TargetSelfOnly = 1 << 4,
    TargetNotSelf = 1 << 5,
    TargetObjectInventory = 1 << 6,
    TargetObjectRoom = 1 << 7,
    TargetObjectWorld = 1 << 8,
    TargetObjectEquipped = 1 << 9
}
