import Discord from "discord.js";
import i18next from "i18next";
import { ChannelsManager } from "../service/ChannelsManager";
import { EmojisManager } from "../service/EmojisManager";
import { messagesHandler } from "./MessagesHander";
import { reactionsHandler } from "./ReactionsHandler";
const pkg = require("../../package.json");

export function eventsHandler(client: Discord.Client) {
  let channelsManager: ChannelsManager;

  client.on("ready", () => {
    channelsManager = ChannelsManager.getInstance(client);
    EmojisManager.getInstance(client);
    if (process.env.NODE_ENV === "dev") { channelsManager.deleteAll(); }
    console.log(i18next.t("motd", {version: pkg.version}));
  });

  client.on("message", (message: Discord.Message) => {
    messagesHandler(message, channelsManager);
  });

  client.on("messageReactionAdd", (reaction: Discord.MessageReaction, user: Discord.User) => {
    reactionsHandler(reaction, user, "add");
  });

  client.on("messageReactionRemove", (reaction: Discord.MessageReaction, user: Discord.User) => {
    reactionsHandler(reaction, user, "remove");
  });

  client.on("error", (error: Error) => { console.error(error); });
}
