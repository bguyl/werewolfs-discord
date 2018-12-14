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
const i18next_1 = __importDefault(require("i18next"));
const ChannelsManager_1 = require("../service/ChannelsManager");
const EmojisManager_1 = require("../service/EmojisManager");
class Role {
    get Name() {
        return this.name;
    }
    get Description() {
        return this.description;
    }
    get ImageURL() {
        return this.imageURL;
    }
}
exports.Role = Role;
class NightRole extends Role {
    get Priority() {
        return this.priority;
    }
}
exports.NightRole = NightRole;
class FortuneTeller extends NightRole {
    constructor(gameId) {
        super();
        this.name = i18next_1.default.t("fortune-teller");
        this.description = i18next_1.default.t("fortune-teller-desc");
        this.priority = 30;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png";
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text");
        this.channel.then((c) => c.setParent(cm.GamesCategory));
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            const cm = ChannelsManager_1.ChannelsManager.getInstance();
            const em = EmojisManager_1.EmojisManager.getInstance();
            this.channel.then((c) => {
                let playersList = "";
                players.forEach((p, i) => {
                    playersList += (i + 1) + ". " + p.User.username + "\n";
                });
                c.send(i18next_1.default.t("fortune-teller-turn") + "\n" + playersList).then((m) => {
                    const msg = m;
                    players.forEach((p, i) => {
                        msg.react(em.Numbers[i]);
                    });
                });
                return Promise.resolve();
            });
        });
    }
}
exports.FortuneTeller = FortuneTeller;
class Witch extends NightRole {
    constructor(gameId, deathPotions, lifePotions) {
        super();
        this.name = i18next_1.default.t("witch");
        this.description = i18next_1.default.t("witch-desc");
        this.priority = 50;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png";
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text");
        this.channel.then((c) => c.setParent(cm.GamesCategory));
        this.deathPotions = deathPotions ? deathPotions : 1;
        this.lifePotions = lifePotions ? lifePotions : 1;
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Witch = Witch;
class Werewolf extends NightRole {
    constructor(channelPromise) {
        super();
        this.name = i18next_1.default.t("werewolf");
        this.description = i18next_1.default.t("werewolf-desc");
        this.priority = 40;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png";
        this.channel = channelPromise;
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Werewolf = Werewolf;
class Cupid extends NightRole {
    constructor(gameId) {
        super();
        this.name = i18next_1.default.t("cupid");
        this.description = i18next_1.default.t("cupid-desc");
        this.priority = 20;
        this.firstRoundOnly = true;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png";
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text");
        this.channel.then((c) => c.setParent(cm.GamesCategory));
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Cupid = Cupid;
class LittleGirl extends NightRole {
    constructor(gameId) {
        super();
        this.name = i18next_1.default.t("little-girl");
        this.description = i18next_1.default.t("little-girl-desc");
        this.priority = 40;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png";
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text");
        this.channel.then((c) => c.setParent(cm.GamesCategory));
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.LittleGirl = LittleGirl;
class Thief extends NightRole {
    constructor(gameId) {
        super();
        this.name = i18next_1.default.t("thief");
        this.description = i18next_1.default.t("thief-desc");
        this.priority = 10;
        this.firstRoundOnly = true;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png";
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.channel = cm.Guild.createChannel(this.name + "__" + gameId, "text");
        this.channel.then((c) => c.setParent(cm.GamesCategory));
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Thief = Thief;
class OrdinaryTownfolk extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("ordinary-townfolk");
        this.description = i18next_1.default.t("ordinary-townfolk-desc");
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png";
    }
}
exports.OrdinaryTownfolk = OrdinaryTownfolk;
class Hunter extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("hunter");
        this.description = i18next_1.default.t("hunter-desc");
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png";
    }
}
exports.Hunter = Hunter;
//# sourceMappingURL=Role.js.map