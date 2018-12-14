import Discord from "discord.js";
import i18next from "i18next";
import { cpus } from "os";
import { messagesHandler } from "../controller/MessagesHander";
import { ChannelsManager } from "../service/ChannelsManager";
import { EmojisManager } from "../service/EmojisManager";
import { Player } from "./Player";

export abstract class Role {
  protected abstract name: string;
  protected abstract description: string;
  protected abstract imageURL: string;

  public get Name(): string {
    return this.name;
  }

  public get Description(): string {
    return this.description;
  }

  public get ImageURL(): string {
    return this.imageURL;
  }
}

export abstract class NightRole extends Role {
  protected abstract priority: number;
  protected abstract channel: Promise<Discord.TextChannel>;
  protected abstract firstRoundOnly: boolean;
  public async abstract play(players: Player[]): Promise<void>;

  public get Priority(): number {
    return this.priority;
  }
}

export class FortuneTeller extends NightRole {
  protected name = i18next.t("fortune-teller");
  protected description = i18next.t("fortune-teller-desc");
  protected priority = 30;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png";
  protected channel: Promise<Discord.TextChannel>;

  constructor(gameId: number) {
    super();
    const cm = ChannelsManager.getInstance();
    this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text") as Promise<Discord.TextChannel>;
    this.channel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
  }

  public async play(players: Player[]): Promise<void> {
    const cm = ChannelsManager.getInstance();
    const em = EmojisManager.getInstance();
    this.channel.then((c: Discord.TextChannel) => {
      let playersList = "";
      players.forEach((p, i) => {
        playersList += (i + 1) + ". " + p.User.username + "\n";
      });
      c.send(i18next.t("fortune-teller-turn") + "\n" + playersList).then((m) => {
        const msg = m as Discord.Message;
        players.forEach((p, i) => {
          msg.react(em.Numbers[i]);
        });
      });
      return Promise.resolve();
    });
  }
}

export class Witch extends NightRole {
  protected name = i18next.t("witch");
  protected description = i18next.t("witch-desc");
  protected priority = 50;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png";
  protected channel: Promise<Discord.TextChannel>;
  private deathPotions: number;
  private lifePotions: number;

  constructor(gameId: number, deathPotions?: number, lifePotions?: number) {
    super();
    const cm = ChannelsManager.getInstance();
    this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text") as Promise<Discord.TextChannel>;
    this.channel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
    this.deathPotions = deathPotions ? deathPotions : 1;
    this.lifePotions = lifePotions ? lifePotions : 1;
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class Werewolf extends NightRole {
  protected name = i18next.t("werewolf");
  protected description = i18next.t("werewolf-desc");
  protected priority = 40;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png";
  protected channel: Promise<Discord.TextChannel>;

  constructor(channelPromise: Promise<Discord.TextChannel>) {
    super();
    this.channel = channelPromise;
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class Cupid extends NightRole {
  protected name = i18next.t("cupid");
  protected description = i18next.t("cupid-desc");
  protected priority = 20;
  protected firstRoundOnly = true;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png";
  protected channel: Promise<Discord.TextChannel>;

  constructor(gameId: number) {
    super();
    const cm = ChannelsManager.getInstance();
    this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text") as Promise<Discord.TextChannel>;
    this.channel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class LittleGirl extends NightRole {
  protected name = i18next.t("little-girl");
  protected description = i18next.t("little-girl-desc");
  protected priority = 40;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png";
  protected channel: Promise<Discord.TextChannel>;

  constructor(gameId: number) {
    super();
    const cm = ChannelsManager.getInstance();
    this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text") as Promise<Discord.TextChannel>;
    this.channel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class Thief extends NightRole {
  protected name = i18next.t("thief");
  protected description = i18next.t("thief-desc");
  protected priority = 10;
  protected firstRoundOnly = true;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png";
  protected channel: Promise<Discord.TextChannel>;
  private secondRole?: Role;

  constructor(gameId: number) {
    super();
    const cm = ChannelsManager.getInstance();
    this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text") as Promise<Discord.TextChannel>;
    this.channel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class OrdinaryTownfolk extends Role {
  protected name = i18next.t("ordinary-townfolk");
  protected description = i18next.t("ordinary-townfolk-desc");
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png";
}

export class Hunter extends Role {
  protected name = i18next.t("hunter");
  protected description = i18next.t("hunter-desc");
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png";
}
