export interface Messages {
    ToPlayer: string;
    ToTarget: string;
    ToRoom: string;
}

export interface LevelBasedMessages {
    hasLevelBasedMessages: boolean;
    ten: Messages;
    twenty: Messages;
    thirty: Messages;
    forty: Messages;
    fifty: Messages;
}
