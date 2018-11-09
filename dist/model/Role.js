"use strict";
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
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png";
    }
}
exports.FortuneTeller = FortuneTeller;
class Witch extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("witch");
        this.description = i18next_1.default.t("witch-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png";
    }
}
exports.Witch = Witch;
class Werewolf extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("werewolf");
        this.description = i18next_1.default.t("werewolf-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png";
    }
}
exports.Werewolf = Werewolf;
class OrdinaryTownfolk extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("ordinary-townfolk");
        this.description = i18next_1.default.t("ordinary-townfolk-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png";
    }
}
exports.OrdinaryTownfolk = OrdinaryTownfolk;
class Cupid extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("cupid");
        this.description = i18next_1.default.t("cupid-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png";
    }
}
exports.Cupid = Cupid;
class Hunter extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("hunter");
        this.description = i18next_1.default.t("hunter-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png";
    }
}
exports.Hunter = Hunter;
class LittleGirl extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("little-girl");
        this.description = i18next_1.default.t("little-girl-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png";
    }
}
exports.LittleGirl = LittleGirl;
class Thief extends Role {
    constructor() {
        super(...arguments);
        this.name = i18next_1.default.t("thief");
        this.description = i18next_1.default.t("thief-desc");
        this.priority = 0;
        this.imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png";
    }
}
exports.Thief = Thief;
//# sourceMappingURL=Role.js.map