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
const discord_js_1 = require("discord.js");
const i18next = require("i18next");
const ChannelsManager_1 = require("../service/ChannelsManager");
const PlayersManager_1 = require("../service/PlayersManager");
class Player {
    constructor(user, gameId) {
        this.ingame = false;
        this.id = Player.counter++;
        this.user = user;
        this.gameId = gameId;
        PlayersManager_1.PlayersManager.getInstance().add(this);
    }
    get User() {
        return this.user;
    }
    get Id() {
        return this.id;
    }
    sendRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ingame = true;
            this.createPrivateChannel(this.gameId).then((c) => {
                c.send(new discord_js_1.RichEmbed()
                    .setTitle(i18next.t("your-role") + role.Name)
                    .setDescription(role.Description)
                    .setImage(role.ImageURL));
            });
        });
    }
    createPrivateChannel(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const gamesCategory = ChannelsManager_1.ChannelsManager.getInstance().GamesCategory;
            return gamesCategory.guild.createChannel(this.user.username + "__" + gameId, "text", [{ allow: 66560, id: this.user.id }]).then((chan) => {
                const textChan = chan;
                this.channel = textChan;
                return textChan.setParent(gamesCategory);
            });
        });
    }
}
Player.counter = 0;
exports.Player = Player;
//# sourceMappingURL=Player.js.map