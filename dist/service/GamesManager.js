"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GamesManager {
    constructor() {
        this.games = [];
    }
    static getInstance() {
        if (GamesManager.instance) {
            return GamesManager.instance;
        }
        return GamesManager.instance = new GamesManager();
    }
    add(game) {
        this.games.push(game);
    }
    findByOwner(user) {
        return this.games.find((g) => g.Owner.User.id === user.id);
    }
    findByLobbyMessage(message) {
        return this.games.find((g) => g.LobbyMessage.id === message.id);
    }
}
exports.GamesManager = GamesManager;
//# sourceMappingURL=GamesManager.js.map