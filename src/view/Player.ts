import Discord, { RichEmbed } from "discord.js";
import i18next = require("i18next");
import { Player as PlayerModel} from "../model/Player";
import { ChannelsManager } from "../service/ChannelsManager";
import { PlayersManager } from "../service/PlayersManager";

export class Player {
  private playerModel: PlayerModel;
  private user: Discord.User;
  private channel?: Discord.TextChannel;

  constructor(user: Discord.User) {
    this.user = user;
    this.playerModel = new PlayerModel();
    PlayersManager.getInstance().add(this);

    let privateChanPromise: Promise<void>;
    this.playerModel.on("gameJoined", (gameId: number) => {
      privateChanPromise = this.createPrivateChannel(gameId);
    });

    this.playerModel.on("roleSet", async () => {
      await privateChanPromise;
      if (!this.channel) { return; }
      this.channel.send(
        new RichEmbed()
          .setTitle(i18next.t("your-role") + this.playerModel.Role.Name)
          .setDescription(this.playerModel.Role.Description)
          .setImage(this.playerModel.Role.ImageURL)
      );
    });
  }

  get PlayerModel(): PlayerModel {
    return this.playerModel;
  }

  get User(): Discord.User {
    return this.user;
  }

  public async createPrivateChannel(gameId: number): Promise<void> {
    const gamesCategory = ChannelsManager.getInstance().GamesCategory;
    this.channel = await gamesCategory.guild.createChannel(
      this.user.username + "__" + gameId,
      "text",
      [{ allow: 66560, id: this.user.id }]
    ).then((chan: Discord.Channel) => {
      const textChan = chan as Discord.TextChannel;
      return textChan.setParent(gamesCategory);
    }) as Discord.TextChannel;
  }
}
