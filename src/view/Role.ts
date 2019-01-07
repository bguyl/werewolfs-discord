import Discord from "discord.js";
import i18next from "i18next";
import { ChannelsManager } from "../service/ChannelsManager";
import { EmojisManager } from "../service/EmojisManager";
import { GamesManager } from "../service/GamesManager";
import { Player } from "./Player";

export abstract class Role {
  protected name: string;
  protected description: string;
  protected imageURL: string;
  protected gameId: number;

  constructor(gameId: number, name: string, description: string, imageURL: string) {
    this.name = name;
    this.description = description;
    this.imageURL = imageURL;
    this.gameId = gameId;
  }

  public get Name(): string {
    return this.name;
  }

  public get Description(): string {
    return this.description;
  }

  public get ImageURL(): string {
    return this.imageURL;
  }

  public abstract addPlayer(player: Player): void;
}

export abstract class DayRole extends Role {
  protected player?: Player;

  public addPlayer(player: Player) {
    if (this.player) { throw new Error("Player is already set."); }
    this.player = player;
    player.sendRole(this);
  }
}

export abstract class NightRole extends Role {
  protected priority: number;
  protected channel: Promise<Discord.TextChannel>;
  protected message?: Discord.Message;
  protected firstRoundOnly: boolean;
  protected playPromise: Promise<void>;

  constructor(
    gameId: number,
    name: string,
    description: string,
    imageURL: string,
    priority: number,
    firstRoundOnly: boolean) {
    super(gameId, name, description, imageURL);
    this.priority = priority;
    this.firstRoundOnly = firstRoundOnly;
    const cm = ChannelsManager.getInstance();
    this.channel = cm.Guild.createChannel(name + "__" + gameId, "text") as Promise<Discord.TextChannel>;
    this.channel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
    this.playPromise = new Promise(() => {});
  }

  public get Priority(): number {
    return this.priority;
  }

  public get Message(): Discord.Message | undefined {
    return this.message;
  }

  public async abstract play(players: Player[]): Promise<void>;
}

export abstract class GroupRole extends NightRole {
  protected players: Player[] = [];

  public addPlayer(player: Player) {
    this.players.push(player);
    player.sendRole(this);
  }
}

export abstract class SoloRole extends NightRole {
  protected player?: Player;

  public addPlayer(player: Player) {
    if (this.player) { throw new Error("Player is already set."); }
    this.player = player;
    player.sendRole(this);
  }
}

export class FortuneTeller extends SoloRole {
  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("fortune-teller"),
      i18next.t("fortune-teller-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png",
      30,
      false
    );
  }

  public async play(players: Player[]): Promise<void> {
    const em = EmojisManager.getInstance();
    const gm = GamesManager.getInstance();
    const others = players.filter((p) => {
      if (!this.player) { return true; }
      return p.Id !== this.player.Id;
    });
    this.channel.then((c: Discord.TextChannel) => {
      let playersList = "";
      others.forEach((p, i) => {
        playersList += (i + 1) + ". " + p.User.username + "\n";
      });
      c.send(i18next.t("fortune-teller-turn") + "\n" + playersList).then((m) => {
        gm.addRole(this);
        this.message = m as Discord.Message;
        const msg = m as Discord.Message;
        others.forEach((p, i) => {
          setTimeout(() => msg.react(em.Numbers[i + 1]), 500);
        });
      });
      return Promise.resolve();
    });
  }
}

export class Witch extends SoloRole {
  protected player?: Player;
  private deathPotions: number;
  private lifePotions: number;

  constructor(gameId: number, deathPotions?: number, lifePotions?: number) {
    super(
      gameId,
      i18next.t("witch"),
      i18next.t("witch-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png",
      50,
      false
    );
    this.deathPotions = deathPotions ? deathPotions : 1;
    this.lifePotions = lifePotions ? lifePotions : 1;
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class Werewolf extends GroupRole {
  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("werewolf"),
      i18next.t("werewolf-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png",
      40,
      false
    );
    this.players = [];
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class Cupid extends SoloRole {
  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("cupid"),
      i18next.t("cupid-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png",
      20,
      true
    );
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class LittleGirl extends SoloRole {
  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("little-girl"),
      i18next.t("little-girl-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png",
      40,
      false
    );
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class Thief extends SoloRole {
  private secondRole?: Role;

  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("thief"),
      i18next.t("thief-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png",
      10,
      true
    );
  }

  public async play(players: Player[]): Promise<void> {
    return Promise.resolve();
  }
}

export class OrdinaryTownfolk extends DayRole {
  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("ordinary-townfolk"),
      i18next.t("ordinary-townfolk-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png"
    );
  }
}

export class Hunter extends DayRole {
  constructor(gameId: number) {
    super(
      gameId,
      i18next.t("hunter"),
      i18next.t("hunter-desc"),
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png"
    );
  }
}
