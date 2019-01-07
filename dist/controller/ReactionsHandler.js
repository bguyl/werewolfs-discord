"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChannelsManager_1 = require("../service/ChannelsManager");
const GamesManager_1 = require("../service/GamesManager");
const PlayersManager_1 = require("../service/PlayersManager");
const Player_1 = require("../view/Player");
function reactionsHandler(reaction, user, action) {
    const channelsManager = ChannelsManager_1.ChannelsManager.getInstance();
    const gamesManager = GamesManager_1.GamesManager.getInstance();
    const playersManager = PlayersManager_1.PlayersManager.getInstance();
    const gameNotStarted = gamesManager.findGameByLobbyMessage(reaction.message);
    const playingRole = gamesManager.findRoleByMessage(reaction.message);
    // Ignore reactions from the bot
    if (user.id === channelsManager.Client.user.id) {
        return;
    }
    if (gameNotStarted && reaction.emoji.toString() === "👍") {
        if (user.id === gameNotStarted.Owner.User.id) {
            if (action === "add") {
                reaction.remove(user);
            }
        }
        else if (action === "add") {
            gameNotStarted.addPlayer(new Player_1.Player(user, gameNotStarted.Id));
        }
        else {
            const player = playersManager.findByUser(user);
            if (player) {
                gameNotStarted.removePlayer(player);
                playersManager.remove(player);
            }
        }
    }
    else if (playingRole) {
        console.log("Oui, oui");
    }
}
exports.reactionsHandler = reactionsHandler;
//# sourceMappingURL=ReactionsHandler.js.map