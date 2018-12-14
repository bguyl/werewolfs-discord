"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const ChannelsManager_1 = require("../service/ChannelsManager");
const EmojisManager_1 = require("../service/EmojisManager");
const MessagesHander_1 = require("./MessagesHander");
const ReactionsHandler_1 = require("./ReactionsHandler");
const pkg = require("../../package.json");
function eventsHandler(client) {
    let channelsManager;
    client.on("ready", () => {
        channelsManager = ChannelsManager_1.ChannelsManager.getInstance(client);
        EmojisManager_1.EmojisManager.getInstance(client);
        if (process.env.NODE_ENV === "dev") {
            channelsManager.deleteAll();
        }
        console.log(i18next_1.default.t("motd", { version: pkg.version }));
    });
    client.on("message", (message) => {
        MessagesHander_1.messagesHandler(message, channelsManager);
    });
    client.on("messageReactionAdd", (reaction, user) => {
        ReactionsHandler_1.reactionsHandler(reaction, user, "add");
    });
    client.on("messageReactionRemove", (reaction, user) => {
        ReactionsHandler_1.reactionsHandler(reaction, user, "remove");
    });
    client.on("error", (error) => { console.error(error); });
}
exports.eventsHandler = eventsHandler;
//# sourceMappingURL=EventsHandler.js.map