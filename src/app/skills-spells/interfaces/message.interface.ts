export interface Messages {
    toPlayer: string;
    toTarget: string;
    toRoom: string;
}

export interface LevelBasedMessages {
    hasLevelBasedMessages: boolean;
    ten: Messages;
    twenty: Messages;
    thirty: Messages;
    forty: Messages;
    fifty: Messages;
}
