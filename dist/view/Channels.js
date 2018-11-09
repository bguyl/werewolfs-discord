"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Channels {
    constructor(client) {
        this.general = null;
        this.gamesCategory = null;
        this.client = client;
        this.createOrFind("general", "text").then((chan) => {
            this.general = chan;
        });
        this.createOrFind("games", "category").then((chan) => {
            this.gamesCategory = chan;
        });
    }
    static getInstance(client) {
        if (Channels.instance) {
            return Channels.instance;
        }
        return Channels.instance = new Channels(client);
    }
    get General() {
        return this.general;
    }
    get GamesCategory() {
        return this.gamesCategory;
    }
    /**
     * Remove the channels the bot previously created
     */
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.guilds.first().channels
                .filter((c) => {
                return (c.name.toLocaleLowerCase().match(/.*__.*/) && c.type === "text") ? true : false;
            })
                .forEach((c) => c.delete());
        });
    }
    /**
     * Create or find a Discord channel
     */
    createOrFind(name, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let chan;
            try {
                chan = this.client.guilds.first().channels
                    .find((c) => c.name === name && c.type === type);
            }
            catch (err) { }
            if (!chan) {
                chan = yield this.client.guilds.first().createChannel(name, type);
            }
            return Promise.resolve(chan);
        });
    }
}
exports.Channels = Channels;
