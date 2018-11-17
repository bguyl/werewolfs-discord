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
const events_1 = require("events");
const i18next_1 = __importDefault(require("i18next"));
class Role extends events_1.EventEmitter {
    get Name() {
        return this.name;
    }
    get Description() {
        return this.description;
    }
    get Priority() {
        return this.priority;
    }
    get ImageURL() {
        return this.imageURL;
    }
}
exports.Role = Role;
class FortuneTeller extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("fortune-teller");
        this.description = i18next_1.default.t("fortune-teller-desc");
        this.priority = 30;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("fortuneteller-turn");
            return new Promise((res) => this.on("played", () => res()));
        });
    }
}
exports.FortuneTeller = FortuneTeller;
class Witch extends Role {
    constructor(deathPotions, lifePotions) {
        super();
        this.name = i18next_1.default.t("witch");
        this.description = i18next_1.default.t("witch-desc");
        this.priority = 50;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png";
        this.deathPotions = deathPotions ? deathPotions : 1;
        this.lifePotions = lifePotions ? lifePotions : 1;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("witch-turn");
            return new Promise((res) => this.on("played", () => res()));
        });
    }
}
exports.Witch = Witch;
class Werewolf extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("werewolf");
        this.description = i18next_1.default.t("werewolf-desc");
        this.priority = 40;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("werewolf-turn");
            return new Promise((res) => this.on("played", () => res()));
        });
    }
}
exports.Werewolf = Werewolf;
class OrdinaryTownfolk extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("ordinary-townfolk");
        this.description = i18next_1.default.t("ordinary-townfolk-desc");
        this.priority = -1;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.reject("An ordinary townfolk can't play during the night");
        });
    }
}
exports.OrdinaryTownfolk = OrdinaryTownfolk;
class Cupid extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("cupid");
        this.description = i18next_1.default.t("cupid-desc");
        this.priority = 20;
        this.firstRoundOnly = true;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("cupid-turn");
            return new Promise((res) => this.on("played", () => res()));
        });
    }
}
exports.Cupid = Cupid;
class Hunter extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("hunter");
        this.description = i18next_1.default.t("hunter-desc");
        this.priority = -1;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.reject("The hunter can't play during the night");
        });
    }
}
exports.Hunter = Hunter;
class LittleGirl extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("little-girl");
        this.description = i18next_1.default.t("little-girl-desc");
        this.priority = 40;
        this.firstRoundOnly = false;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("littlegirl-turn");
            return new Promise((res) => this.on("played", () => res()));
        });
    }
}
exports.LittleGirl = LittleGirl;
class Thief extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("thief");
        this.description = i18next_1.default.t("thief-desc");
        this.priority = 10;
        this.firstRoundOnly = true;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png";
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("thief-turn");
            return new Promise((res) => this.on("played", () => res()));
        });
    }
}
exports.Thief = Thief;
//# sourceMappingURL=Role.js.map