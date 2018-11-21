export enum FlagEnum {
  None = 0,
  Antievil = 1 << 0, //zap if align -350 & lower
  Antigood = 1 << 1, //zap if align +350 & lower
  Antineutral = 1 << 2, //zap if align -350 to +350
  Bless = 1 << 3, // +20% resist dam.
  Container = 1 << 4, // isContainer
  Cursed = 1 << 5,
  Equipable = 1 << 6, // can be equipped
  Evil = 1 << 7, //glow on det.evil
  Glow = 1 << 8, //lights area
  Holy = 1 << 9,
  Hum = 1 << 10, //affect n/a
  Invis = 1 << 11, //invisible
  Nodrop = 1 << 12, // cannot drop
  Nolocate = 1 << 13,   //locate spell fails
  Noremove = 1 << 14, //cannot remove w/o remove curse
  QuestItem = 1 << 15,
  Vampric = 1 << 16, // Drains hp on hoit
}
