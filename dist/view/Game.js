"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const i18next_1 = __importDefault(require("i18next"));
const Game_1 = require("../model/Game");
const ChannelsManager_1 = require("../service/ChannelsManager");
const Player_1 = require("./Player");
class Game {
    constructor(owner) {
        const channelsManager = ChannelsManager_1.ChannelsManager.getInstance();
        this.owner = new Player_1.Player(owner);
        this.gameModel = new Game_1.Game(this.owner.PlayerModel);
        const richLobbyMessage = new discord_js_1.default.RichEmbed()
            .setTitle(i18next_1.default.t("new-game"))
            .setDescription(i18next_1.default.t("ask-to-join") + "\n" + i18next_1.default.t("created-by") + this.owner.User);
        channelsManager.General.send(richLobbyMessage.setColor(0xFF0000)).then((message) => {
            const msg = message;
            msg.react("👍");
            this.lobbyMessage = msg;
            this.gameModel.addPlayer(this.owner.PlayerModel);
        });
        this.gameModel.on("enoughPlayers", () => { this.LobbyMessage.edit(richLobbyMessage.setColor(0x00FF00)); });
        this.gameModel.on("notEnoughPlayers", () => { this.LobbyMessage.edit(richLobbyMessage.setColor(0xFF0000)); });
        this.gameModel.on("started", () => {
            channelsManager.Guild.createChannel(i18next_1.default.t("village") + "__" + this.gameModel.Id, "text")
                .then((chan) => chan.setParent(channelsManager.GamesCategory));
        });
    }
    get Owner() {
        return this.owner;
    }
    get GameModel() {
        return this.gameModel;
    }
    get LobbyMessage() {
        if (!this.lobbyMessage) {
            throw new Error("Cannot find the lobby message of game " + this.gameModel.Id);
        }
        return this.lobbyMessage;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map