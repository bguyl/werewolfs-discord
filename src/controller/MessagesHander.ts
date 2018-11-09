import Discord from "discord.js";
import i18next from "i18next";
import { ChannelsManager } from "../service/ChannelsManager";
import { GamesManager } from "../service/GamesManager";
import { Game } from "../view/Game";

export function messagesHandler(message: Discord.Message, channelManager: ChannelsManager) {
  // Messages are handled on the general channel only
  if (message.channel.id !== channelManager.General.id) { return; }

  const content = message.content;
  const gamesManager = GamesManager.getInstance();

  if (content.match(/^\!help.*$/)) {
    channelManager.General.send(i18next.t("help", {help : "!help", create: "!create", start: "!start"}));
  } else if (content.match(/^\!start.*$/)) {
    const game = gamesManager.findByOwner(message.author);
    if (game) {
      game.GameModel.start();
      message.delete();
    }
  } else if (content.match(/^!create.*$/g)) {
    const args = content.split(" ");
    gamesManager.add(new Game(message.author));
    message.delete();
  } else if (process.env.NODE_ENV === "dev" && content.match(/^!clear$/)) {
    channelManager.General.fetchMessages().then((messages) => {
      messages.forEach((m) => {
        m.delete();
      });
    });
  }
}
