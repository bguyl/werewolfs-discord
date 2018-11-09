import Discord from "discord.js";
import _ from "lodash";
import { Player } from "../view/Player";

export class PlayersManager {
  public static getInstance(): PlayersManager {
    if (PlayersManager.instance) { return PlayersManager.instance; }
    return PlayersManager.instance = new PlayersManager();
  }

  private static instance: PlayersManager;
  private players: Player[] = [];

  private constructor() { }

  public add(player: Player) {
    this.players.push(player);
  }

  public remove(player: Player) {
    _.remove(this.players, (p: Player) => p.User.id === player.User.id);
  }

  public findByUser(user: Discord.User): Player | undefined {
    return this.players.find((p: Player) => p.User.id === user.id);
  }
}
