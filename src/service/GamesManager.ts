import Discord from "discord.js";
import { Game } from "../view/Game";

export class GamesManager {
  public static getInstance(): GamesManager {
    if (GamesManager.instance) { return GamesManager.instance; }
    return GamesManager.instance = new GamesManager();
  }

  private static instance: GamesManager;
  private games: Game[] = [];

  private constructor() { }

  public add(game: Game) {
    this.games.push(game);
  }

  public findByOwner(user: Discord.User): Game | undefined {
    return this.games.find((g: Game) => g.Owner.User.id === user.id);
  }

  public findByLobbyMessage(message: Discord.Message): Game | undefined {
    return this.games.find((g: Game) => g.LobbyMessage.id === message.id);
  }
}
