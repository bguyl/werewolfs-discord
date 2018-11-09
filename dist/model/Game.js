"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const lodash_1 = __importDefault(require("lodash"));
const Role_1 = require("./Role");
class Game extends events_1.EventEmitter {
    constructor(owner) {
        super();
        this.players = [];
        this.started = false;
        this.owner = owner;
        this.id = Game.counter++;
    }
    get Id() {
        return this.id;
    }
    get NbPlayers() {
        return this.players.length;
    }
    addPlayer(player) {
        if (this.started) {
            return;
        }
        this.players.push(player);
        if (this.players.length > 2) {
            this.emit("enoughPlayers");
        }
        this.emit("playerAdded");
    }
    removePlayer(player) {
        if (this.started) {
            return;
        }
        lodash_1.default.remove(this.players, (p) => p.Id === player.Id);
        if (this.players.length < 3) {
            this.emit("notEnoughPlayers");
        }
        this.emit("playerRemoved");
        console.debug(this.players.length);
    }
    start() {
        if (this.players.length < 3) {
            throw new Error("Not enought players to start a game.");
        }
        this.started = true;
        this.emit("started");
        const roles = this.generateRoleSet(this.players.length);
        this.players.forEach((player) => {
            player.joinGame(this.id);
            player.Role = roles.pop();
        });
    }
    generateRoleSet(amount) {
        const roles = [];
        roles.push(new Role_1.Werewolf());
        roles.push(new Role_1.Werewolf());
        roles.push(new Role_1.Witch());
        roles.push(new Role_1.FortuneTeller());
        roles.push(new Role_1.Cupid());
        roles.push(new Role_1.Hunter());
        if (amount > 6) {
            roles.push(new Role_1.LittleGirl());
        }
        if (amount > 7) {
            for (let i = 0; i < amount - 7; i++) {
                roles.push(new Role_1.OrdinaryTownfolk());
            }
        }
        return lodash_1.default.shuffle(roles);
    }
}
Game.counter = 0;
exports.Game = Game;
//# sourceMappingURL=Game.js.map