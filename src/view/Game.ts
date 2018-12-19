import Discord from "discord.js";
import i18next from "i18next";
import _ from "lodash";
import { ChannelsManager } from "../service/ChannelsManager";
import { Player } from "./Player";
import {
  Cupid, FortuneTeller, Hunter, NightRole, OrdinaryTownfolk, Role, Werewolf, Witch
} from "./Role";

export class Game {
  private static counter = 0;
  private id: number;
  private owner: Player;
  private players: Player[] = [];
  private started: boolean = false;
  private lobbyMessage?: Discord.Message;
  private richLobbyMessage: Discord.RichEmbed;

  constructor(owner: Discord.User) {
    this.id = Game.counter ++;
    this.owner = new Player(owner, this.id);
    this.addPlayer(this.owner);
    const cm = ChannelsManager.getInstance();
    this.richLobbyMessage = new Discord.RichEmbed()
      .setTitle(i18next.t("new-game"))
      .setDescription(i18next.t("ask-to-join") + "\n" + i18next.t("created-by") + owner);
    cm.General.send(this.richLobbyMessage.setColor(0xFF0000)).then((message) => {
      const msg = message as Discord.Message;
      msg.react("👍");
      this.lobbyMessage = msg;
    });
  }

  public get Owner(): Player {
    return this.owner;
  }

  public get Id(): number {
    return this.id;
  }

  public get NbPlayers(): number {
    return this.players.length;
  }

  public get LobbyMessage(): Discord.Message {
    if (!this.lobbyMessage) { throw new Error("Cannot find the lobby message of game " + this.Id); }
    return this.lobbyMessage;
  }

  public addPlayer(player: Player): void {
    if (this.started) { return; }
    this.players.push(player);
    if (this.players.length > 2) {
      this.LobbyMessage.edit(this.richLobbyMessage.setColor(0x00FF00));
    }
  }

  public removePlayer(player: Player): void {
    if (this.started) { return; }
    _.remove(this.players, (p: Player) => p.Id === player.Id);
    if (this.players.length < 3) {
      this.LobbyMessage.edit(this.richLobbyMessage.setColor(0xFF0000));
    }
  }

  public async start() {
    if (this.players.length < 3) { throw new Error("Not enough players to start a game."); }
    this.started = true;
    const cm = ChannelsManager.getInstance();
    cm.Guild.createChannel(i18next.t("village") + "__" + this.Id, "text")
      .then((chan: Discord.GuildChannel) => chan.setParent(cm.GamesCategory));

    const roles = this.generateRoleSet(this.players.length);
    const playersDistribution = _.shuffle(this.players);

    roles.nightRoles.forEach((r: NightRole) => {
      const p = playersDistribution.pop();
      if (!p) { throw new Error("Can't assign a player to this role"); }
      r.addPlayer(p);
    });

    roles.firstNightRoles.forEach((r: NightRole) => {
      const p = playersDistribution.pop();
      if (!p) { throw new Error("Can't assign a player to this role"); }
      r.addPlayer(p);
    });

    roles.dayRoles.forEach((r: Role) => {
      const p = playersDistribution.pop();
      if (!p) { throw new Error("Can't assign a player to this role"); }
      r.addPlayer(p);
    });

    if (playersDistribution.length !== 0) {
      throw new Error("Some players doesn't have any role");
    }

    const firstNight = _.sortBy(roles.nightRoles.concat(roles.firstNightRoles), (r: NightRole) => {
      return r.Priority;
    });

    for (const role of firstNight) {
      await role.play(this.players);
    }
  }

  private generateRoleSet(amount: number): { nightRoles: NightRole[], firstNightRoles: NightRole[], dayRoles: Role[] } {
    const nightRoles: NightRole[] = [];
    const firstNightRoles: NightRole[] = [];
    const dayRoles: Role[] = [];
    const werewolfRole = new Werewolf(this.Id);
    nightRoles.push(werewolfRole);
    // nightRoles.push(werewolfRole);
    nightRoles.push(new Witch(this.Id));
    nightRoles.push(new FortuneTeller(this.Id));
    // firstNightRoles.push(new Cupid(this.Id));
    // dayRoles.push(new Hunter(this.Id));
    if (amount > 3) {
    //   roles.push(new LittleGirl(this.Id));
    // }
    // if (amount > 7) {
      for (let i = 0; i < amount - 3; i++) {
        dayRoles.push(new OrdinaryTownfolk(this.Id));
      }
    }
    return {nightRoles, firstNightRoles, dayRoles};
  }
}
