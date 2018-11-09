import Discord from "discord.js";
import { ChannelsManager } from "../service/ChannelsManager";
import { GamesManager } from "../service/GamesManager";
import { PlayersManager } from "../service/PlayersManager";
import { Player } from "../view/Player";

export function reactionsHandler(reaction: Discord.MessageReaction, user: Discord.User, action: "add" | "remove") {
  const channelsManager = ChannelsManager.getInstance();
  const gamesManager = GamesManager.getInstance();
  const playersManager = PlayersManager.getInstance();
  const gameNotStarted = gamesManager.findByLobbyMessage(reaction.message);

  // Ignore reactions from the bot
  if (user.id === channelsManager.Client.user.id) { return; }

  if (gameNotStarted && reaction.emoji.toString() === "👍") {
    if (user.id === gameNotStarted.Owner.User.id) {
      if (action === "add") { reaction.remove(user); }
    } else if (action === "add") {
      gameNotStarted.GameModel.addPlayer(new Player(user).PlayerModel);
    } else {
      const player = playersManager.findByUser(user);
      if (player) {
        gameNotStarted.GameModel.removePlayer(player.PlayerModel);
        playersManager.remove(player);
      }
    }
  }

}
