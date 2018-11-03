export enum FlagEnum {
    None = 0,
    Antievil = 1, //zap if align -350 & lower
    Antigood = 2, //zap if align +350 & lower
    Antineutral = 4, //zap if align -350 to +350
    Bless = 8, // +20% resist dam.
    Container = 16, // isContainer
    Cursed = 32,
    Equipable = 64, // can be equipped
    Evil = 128, //glow on det.evil
    Glow = 256, //lights area
    Holy = 512,
    Hum = 1024, //affect n/a
    Invis = 2024, //invisible
    Nodrop = 4096, // cannot drop
    Nolocate = 8192,   //locate spell fails
    Noremove = 16384, //cannot remove w/o remove curse
    QuestItem = 32768,
    Vampric = 65536, // Drains hp on hoit
}
