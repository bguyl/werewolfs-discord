import Discord from "discord.js";
import i18next from "i18next";
import _ from "lodash";
import { ChannelsManager } from "../service/ChannelsManager";
import { Player } from "./Player";
import {
  Cupid, FortuneTeller, Hunter, LittleGirl, NightRole, OrdinaryTownfolk, Role, Thief, Werewolf, Witch
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
    if (this.players.length < 3) { throw new Error("Not enought players to start a game."); }
    this.started = true;
    const cm = ChannelsManager.getInstance();
    cm.Guild.createChannel(i18next.t("village") + "__" + this.Id, "text")
      .then((chan: Discord.GuildChannel) => chan.setParent(cm.GamesCategory));

    const roles = this.generateRoleSet(this.players.length);

    this.players.forEach((player) => {
      player.Role = roles.pop() as Role;
    });

    let nightPlayers = this.players.filter((p: Player) => p.Role instanceof NightRole);
    nightPlayers = _.sortBy(nightPlayers, (p: Player) => {
      const r = p.Role as NightRole;
      return r.Priority;
    });
    for (const player of nightPlayers) {
      const r = player.Role as NightRole;
      await r.play(this.players);
    }
  }

  private generateRoleSet(amount: number): Role[] {
    const roles: Role[] = [];
    const cm = ChannelsManager.getInstance();
    const werewolfChannel = cm.Guild.createChannel(
      i18next.t("werewolf") + "__" + this.id , "text"
    ) as Promise<Discord.TextChannel>;
    werewolfChannel.then((c: Discord.TextChannel) => c.setParent(cm.GamesCategory));
    roles.push(new Werewolf(werewolfChannel));
    roles.push(new Werewolf(werewolfChannel));
    roles.push(new Witch(this.Id));
    roles.push(new FortuneTeller(this.Id));
    roles.push(new Cupid(this.Id));
    roles.push(new Hunter());
    if (amount > 6) {
      roles.push(new LittleGirl(this.Id));
    }
    if (amount > 7) {
      for (let i = 0; i < amount - 7; i++) {
        roles.push(new OrdinaryTownfolk());
      }
    }
    return _.shuffle(roles);
  }
}
