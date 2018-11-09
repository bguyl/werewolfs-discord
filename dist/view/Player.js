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
const Player_1 = require("../model/Player");
const ChannelsManager_1 = require("../service/ChannelsManager");
const PlayersManager_1 = require("../service/PlayersManager");
class Player {
    constructor(user) {
        this.user = user;
        this.playerModel = new Player_1.Player();
        PlayersManager_1.PlayersManager.getInstance().add(this);
        let privateChanPromise;
        this.playerModel.on("gameJoined", (gameId) => {
            privateChanPromise = this.createPrivateChannel(gameId);
        });
        this.playerModel.on("roleSet", () => __awaiter(this, void 0, void 0, function* () {
            yield privateChanPromise;
            if (!this.channel) {
                return;
            }
            this.channel.send(new discord_js_1.RichEmbed()
                .setTitle(i18next.t("your-role") + this.playerModel.Role.Name)
                .setDescription(this.playerModel.Role.Description)
                .setImage(this.playerModel.Role.ImageURL));
        }));
    }
    get PlayerModel() {
        return this.playerModel;
    }
    get User() {
        return this.user;
    }
    createPrivateChannel(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const gamesCategory = ChannelsManager_1.ChannelsManager.getInstance().GamesCategory;
            this.channel = (yield gamesCategory.guild.createChannel(this.user.username + "__" + gameId, "text", [{ allow: 66560, id: this.user.id }]).then((chan) => {
                const textChan = chan;
                return textChan.setParent(gamesCategory);
            }));
        });
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map