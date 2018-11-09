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
class ChannelsManager {
    static getInstance(client) {
        if (ChannelsManager.instance) {
            return ChannelsManager.instance;
        }
        if (!client) {
            throw new Error("There is no ChannelsManager instance and the client was not provided");
        }
        return ChannelsManager.instance = new ChannelsManager(client);
    }
    constructor(client) {
        this.client = client;
        this.guild = client.guilds.first();
        this.createOrFind("general", "text").then((chan) => {
            this.general = chan;
        });
        this.createOrFind("games", "category").then((chan) => {
            this.gamesCategory = chan;
        });
    }
    get General() {
        if (!this.general) {
            throw new Error("Cannot find the General channel");
        }
        return this.general;
    }
    get GamesCategory() {
        if (!this.gamesCategory) {
            throw new Error("Cannot find the Game category");
        }
        return this.gamesCategory;
    }
    get Client() {
        return this.client;
    }
    get Guild() {
        return this.guild;
    }
    /**
     * Remove the channels the bot previously created
     */
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.guild.channels
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
                chan = this.guild.channels.find((c) => c.name === name && c.type === type);
                // tslint:disable-next-line:no-empty
            }
            catch (err) { }
            if (!chan) {
                chan = yield this.guild.createChannel(name, type);
            }
            return Promise.resolve(chan);
        });
    }
}
exports.ChannelsManager = ChannelsManager;
//# sourceMappingURL=ChannelsManager.js.map