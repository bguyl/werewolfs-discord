import Discord from "discord.js";
import { Game } from "../view/Game";
import { NightRole } from "../view/Role";

export class GamesManager {
  public static getInstance(): GamesManager {
    if (GamesManager.instance) { return GamesManager.instance; }
    return GamesManager.instance = new GamesManager();
  }

  private static instance: GamesManager;
  private games: Game[] = [];
  private roles: NightRole[] = [];

  private constructor() { }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public addRole(role: NightRole) {
    this.roles.push(role);
  }

  public findGameByOwner(user: Discord.User): Game | undefined {
    return this.games.find((g: Game) => g.Owner.User.id === user.id);
  }

  public findGameByLobbyMessage(message: Discord.Message): Game | undefined {
    return this.games.find((g: Game) => g.LobbyMessage.id === message.id);
  }

  public findRoleByMessage(message: Discord.Message): NightRole | undefined {
    return this.roles.find((r: NightRole) => {
      if (!r.Message) { return false; }
      return r.Message.id === message.id;
    });
  }
}
