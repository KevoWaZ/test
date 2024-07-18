module.exports = {
    app: {
        token: 'MTI2MjkyNjYzOTAyMTQyODc4OA.GkGudH.3vuLDuzsksWf8LAnFgqRnHUK-eOicvH2u_r-u0',
        playing: 'Ecoute de la musique',
        global: true,
        guild: 'xxx',
        extraMessages: false,
        loopMessage: false,
        lang: 'en',
        enableEmojis: false,
    },

    emojis:{
        'back': '⏪',
        'skip': '⏩',
        'ResumePause': '⏯️',
        'savetrack': '💾',
        'volumeUp': '🔊',
        'volumeDown': '🔉',
        'loop': '🔁',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        Translate_Timeout: 10000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 50
            }
        }
    }
};
