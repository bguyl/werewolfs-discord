"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Player extends events_1.EventEmitter {
    constructor() {
        super();
        this.ingame = false;
        this.id = Player.counter++;
    }
    get Id() {
        return this.id;
    }
    get Role() {
        if (!this.role) {
            throw new Error("Attempt to access to player's role before assign it");
        }
        return this.role;
    }
    set Role(role) {
        this.role = role;
        this.emit("roleSet");
    }
    joinGame(gameId) {
        this.ingame = true;
        this.gameId = gameId;
        this.emit("gameJoined", gameId);
    }
}
Player.counter = 0;
exports.Player = Player;
//# sourceMappingURL=Player.js.map