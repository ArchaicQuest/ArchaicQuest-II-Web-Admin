
export interface Settings {
    id: number;
    doubleXp: number;
    doubleGains: number;
    doubleQuestPoints: number;
    pkAllowed: number;
    playerThievingAllowed: number;
    minLevelCanShout: number;
    defaultRecallRoom: number;
    maxNpcCorpseTime: number;
    maxPcCorpseTime: number;
    maxIdleTime: number;
    playerTick: number;
    updateTick: number;
    startingRoom: number;
    postToDiscord?: boolean;
    channelDiscordWebHookURL?: string;
    eventsDiscordWebHookURL?: string;
    errorDiscordWebHookURL?: string;
    postMarkKey?: string;
}
