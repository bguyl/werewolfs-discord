import Discord from "discord.js";
import i18next from "i18next";
import { Game as GameModel } from "../model/Game";
import { ChannelsManager } from "../service/ChannelsManager";
import { Player } from "./Player";

export class Game {
  private gameModel: GameModel;
  private owner: Player;
  private lobbyMessage?: Discord.Message;

  constructor(owner: Discord.User) {
    const channelsManager = ChannelsManager.getInstance();
    this.owner = new Player(owner);
    this.gameModel = new GameModel(this.owner.PlayerModel);
    const richLobbyMessage = new Discord.RichEmbed()
      .setTitle(i18next.t("new-game"))
      .setDescription(i18next.t("ask-to-join") + "\n" + i18next.t("created-by") + this.owner.User);
    channelsManager.General.send(richLobbyMessage.setColor(0xFF0000)).then((message) => {
      const msg = message as Discord.Message;
      msg.react("👍");
      this.lobbyMessage = msg;
      this.gameModel.addPlayer(this.owner.PlayerModel);
    });
    this.gameModel.on("enoughPlayers", () => { this.LobbyMessage.edit(richLobbyMessage.setColor(0x00FF00)); });
    this.gameModel.on("notEnoughPlayers", () => { this.LobbyMessage.edit(richLobbyMessage.setColor(0xFF0000)); });
    this.gameModel.on("started", () => {
      channelsManager.Guild.createChannel(i18next.t("village") + "__" + this.gameModel.Id, "text")
        .then((chan: Discord.GuildChannel) => chan.setParent(channelsManager.GamesCategory));
    });
  }

  public get Owner(): Player {
    return this.owner;
  }

  public get GameModel(): GameModel {
    return this.gameModel;
  }

  public get LobbyMessage(): Discord.Message {
    if (!this.lobbyMessage) { throw new Error("Cannot find the lobby message of game " + this.gameModel.Id); }
    return this.lobbyMessage;
  }
}
