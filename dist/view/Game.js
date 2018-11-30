"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const i18next_1 = __importDefault(require("i18next"));
const lodash_1 = __importDefault(require("lodash"));
const ChannelsManager_1 = require("../service/ChannelsManager");
const Player_1 = require("./Player");
const Role_1 = require("./Role");
class Game {
    constructor(owner) {
        this.players = [];
        this.started = false;
        this.id = Game.counter++;
        this.owner = new Player_1.Player(owner, this.id);
        this.addPlayer(this.owner);
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.richLobbyMessage = new discord_js_1.default.RichEmbed()
            .setTitle(i18next_1.default.t("new-game"))
            .setDescription(i18next_1.default.t("ask-to-join") + "\n" + i18next_1.default.t("created-by") + owner);
        cm.General.send(this.richLobbyMessage.setColor(0xFF0000)).then((message) => {
            const msg = message;
            msg.react("👍");
            this.lobbyMessage = msg;
        });
    }
    get Owner() {
        return this.owner;
    }
    get Id() {
        return this.id;
    }
    get NbPlayers() {
        return this.players.length;
    }
    get LobbyMessage() {
        if (!this.lobbyMessage) {
            throw new Error("Cannot find the lobby message of game " + this.Id);
        }
        return this.lobbyMessage;
    }
    addPlayer(player) {
        if (this.started) {
            return;
        }
        this.players.push(player);
        if (this.players.length > 2) {
            this.LobbyMessage.edit(this.richLobbyMessage.setColor(0x00FF00));
        }
    }
    removePlayer(player) {
        if (this.started) {
            return;
        }
        lodash_1.default.remove(this.players, (p) => p.Id === player.Id);
        if (this.players.length < 3) {
            this.LobbyMessage.edit(this.richLobbyMessage.setColor(0xFF0000));
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.players.length < 3) {
                throw new Error("Not enought players to start a game.");
            }
            this.started = true;
            const cm = ChannelsManager_1.ChannelsManager.getInstance();
            cm.Guild.createChannel(i18next_1.default.t("village") + "__" + this.Id, "text")
                .then((chan) => chan.setParent(cm.GamesCategory));
            const roles = this.generateRoleSet(this.players.length);
            this.players.forEach((player) => {
                player.Role = roles.pop();
            });
            let nightPlayers = this.players.filter((p) => p.Role instanceof Role_1.NightRole);
            nightPlayers = lodash_1.default.sortBy(nightPlayers, (p) => {
                const r = p.Role;
                return r.Priority;
            });
            for (const player of nightPlayers) {
                const r = player.Role;
                yield r.play(this.players);
            }
        });
    }
    generateRoleSet(amount) {
        const roles = [];
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        const werewolfChannel = cm.Guild.createChannel(i18next_1.default.t("werewolf") + "__" + this.id, "text");
        werewolfChannel.then((c) => c.setParent(cm.GamesCategory));
        roles.push(new Role_1.Werewolf(werewolfChannel));
        roles.push(new Role_1.Werewolf(werewolfChannel));
        roles.push(new Role_1.Witch(this.Id));
        roles.push(new Role_1.FortuneTeller(this.Id));
        roles.push(new Role_1.Cupid(this.Id));
        roles.push(new Role_1.Hunter());
        if (amount > 6) {
            roles.push(new Role_1.LittleGirl(this.Id));
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