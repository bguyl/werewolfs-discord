"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const GamesManager_1 = require("../service/GamesManager");
const Game_1 = require("../view/Game");
function messagesHandler(message, channelManager) {
    // Messages are handled on the general channel only
    if (message.channel.id !== channelManager.General.id) {
        return;
    }
    const content = message.content;
    const gamesManager = GamesManager_1.GamesManager.getInstance();
    if (content.match(/^\!help.*$/)) {
        channelManager.General.send(i18next_1.default.t("help", { help: "!help", create: "!create", start: "!start" }));
    }
    else if (content.match(/^\!start.*$/)) {
        const game = gamesManager.findByOwner(message.author);
        if (game) {
            game.start();
            message.delete();
            game.LobbyMessage.delete();
        }
    }
    else if (content.match(/^!create.*$/g)) {
        const args = content.split(" ");
        gamesManager.add(new Game_1.Game(message.author));
        message.delete();
    }
    else if (process.env.NODE_ENV === "dev" && content.match(/^!clear$/)) {
        channelManager.General.fetchMessages().then((messages) => {
            messages.forEach((m) => {
                m.delete();
            });
        });
    }
}
exports.messagesHandler = messagesHandler;
//# sourceMappingURL=MessagesHander.js.map