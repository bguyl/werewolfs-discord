"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GamesManager {
    constructor() {
        this.games = [];
        this.roles = [];
    }
    static getInstance() {
        if (GamesManager.instance) {
            return GamesManager.instance;
        }
        return GamesManager.instance = new GamesManager();
    }
    addGame(game) {
        this.games.push(game);
    }
    addRole(role) {
        this.roles.push(role);
    }
    findGameByOwner(user) {
        return this.games.find((g) => g.Owner.User.id === user.id);
    }
    findGameByLobbyMessage(message) {
        return this.games.find((g) => g.LobbyMessage.id === message.id);
    }
    findRoleByMessage(message) {
        return this.roles.find((r) => {
            if (!r.Message) {
                return false;
            }
            return r.Message.id === message.id;
        });
    }
}
exports.GamesManager = GamesManager;
//# sourceMappingURL=GamesManager.js.map