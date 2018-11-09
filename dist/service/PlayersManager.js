"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class PlayersManager {
    constructor() {
        this.players = [];
    }
    static getInstance() {
        if (PlayersManager.instance) {
            return PlayersManager.instance;
        }
        return PlayersManager.instance = new PlayersManager();
    }
    add(player) {
        this.players.push(player);
    }
    remove(player) {
        lodash_1.default.remove(this.players, (p) => p.User.id === player.User.id);
    }
    findByUser(user) {
        return this.players.find((p) => p.User.id === user.id);
    }
}
exports.PlayersManager = PlayersManager;
//# sourceMappingURL=PlayersManager.js.map