import Discord, { RichEmbed } from "discord.js";
import i18next = require("i18next");
import { ChannelsManager } from "../service/ChannelsManager";
import { PlayersManager } from "../service/PlayersManager";
import { Role } from "./Role";

export class Player {
  private static counter = 0;
  private user: Discord.User;
  private channel?: Discord.TextChannel;
  private role?: Role;
  private id: number;
  private ingame: boolean = false;
  private gameId: number;

  constructor(user: Discord.User, gameId: number) {
    this.id = Player.counter ++;
    this.user = user;
    this.gameId = gameId;
    PlayersManager.getInstance().add(this);
  }

  get User(): Discord.User {
    return this.user;
  }

  public get Id(): number {
    return this.id;
  }

  public get Role(): Role {
    if (!this.role) { throw new Error("Attempt to access to player's role before assign it"); }
    return this.role;
  }

  public set Role(role: Role) {
    this.role = role;
    this.ingame = true;
    this.sendRole();
  }

  public async sendRole(): Promise<void> {
    this.createPrivateChannel(this.gameId).then((c: Discord.TextChannel) => {
      c.send(
        new RichEmbed()
          .setTitle(i18next.t("your-role") + this.Role.Name)
          .setDescription(this.Role.Description)
          .setImage(this.Role.ImageURL)
      );
    });
  }

  public async createPrivateChannel(gameId: number): Promise<Discord.TextChannel> {
    const gamesCategory = ChannelsManager.getInstance().GamesCategory;
    return gamesCategory.guild.createChannel(
      this.user.username + "__" + gameId,
      "text",
      [{ allow: 66560, id: this.user.id }]
    ).then((chan: Discord.GuildChannel) => {
      const textChan = chan as Discord.TextChannel;
      this.channel = textChan;
      return textChan.setParent(gamesCategory);
    }) as Promise<Discord.TextChannel>;
  }
}
