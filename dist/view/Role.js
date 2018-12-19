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
    constructor(gameId, name, description, imageURL) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.gameId = gameId;
    }
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
class DayRole extends Role {
    addPlayer(player) {
        if (this.player) {
            throw new Error("Player is already set.");
        }
        this.player = player;
        player.sendRole(this);
    }
}
exports.DayRole = DayRole;
class NightRole extends Role {
    constructor(gameId, name, description, imageURL, priority, firstRoundOnly) {
        super(gameId, name, description, imageURL);
        this.priority = priority;
        this.firstRoundOnly = firstRoundOnly;
        const cm = ChannelsManager_1.ChannelsManager.getInstance();
        this.channel = cm.Guild.createChannel(name + "__" + gameId, "text");
        this.channel.then((c) => c.setParent(cm.GamesCategory));
    }
    get Priority() {
        return this.priority;
    }
}
exports.NightRole = NightRole;
class GroupRole extends NightRole {
    constructor() {
        super(...arguments);
        this.players = [];
    }
    addPlayer(player) {
        this.players.push(player);
        player.sendRole(this);
    }
}
exports.GroupRole = GroupRole;
class SoloRole extends NightRole {
    addPlayer(player) {
        if (this.player) {
            throw new Error("Player is already set.");
        }
        this.player = player;
        player.sendRole(this);
    }
}
exports.SoloRole = SoloRole;
class FortuneTeller extends SoloRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("fortune-teller"), i18next_1.default.t("fortune-teller-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png", 30, false);
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            const em = EmojisManager_1.EmojisManager.getInstance();
            this.channel.then((c) => {
                let playersList = "";
                players.forEach((p, i) => {
                    playersList += (i + 1) + ". " + p.User.username + "\n";
                });
                c.send(i18next_1.default.t("fortune-teller-turn") + "\n" + playersList).then((m) => {
                    const msg = m;
                    players.forEach((p, i) => {
                        msg.react(em.Numbers[i + 1]);
                    });
                });
                return Promise.resolve();
            });
        });
    }
}
exports.FortuneTeller = FortuneTeller;
class Witch extends SoloRole {
    constructor(gameId, deathPotions, lifePotions) {
        super(gameId, i18next_1.default.t("witch"), i18next_1.default.t("witch-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png", 50, false);
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
class Werewolf extends GroupRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("werewolf"), i18next_1.default.t("werewolf-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png", 40, false);
        this.players = [];
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Werewolf = Werewolf;
class Cupid extends SoloRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("cupid"), i18next_1.default.t("cupid-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png", 20, true);
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Cupid = Cupid;
class LittleGirl extends SoloRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("little-girl"), i18next_1.default.t("little-girl-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png", 40, false);
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.LittleGirl = LittleGirl;
class Thief extends SoloRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("thief"), i18next_1.default.t("thief-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png", 10, true);
    }
    play(players) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.Thief = Thief;
class OrdinaryTownfolk extends DayRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("ordinary-townfolk"), i18next_1.default.t("ordinary-townfolk-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png");
    }
}
exports.OrdinaryTownfolk = OrdinaryTownfolk;
class Hunter extends DayRole {
    constructor(gameId) {
        super(gameId, i18next_1.default.t("hunter"), i18next_1.default.t("hunter-desc"), "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png");
    }
}
exports.Hunter = Hunter;
//# sourceMappingURL=Role.js.map