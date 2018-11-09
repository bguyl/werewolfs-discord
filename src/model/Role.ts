import { EventEmitter } from "events";
import i18next from "i18next";

export abstract class Role extends EventEmitter {
  protected abstract name: string;
  protected abstract description: string;
  protected abstract priority: number;
  protected abstract firstRoundOnly: boolean;
  protected abstract imageURL: string;

  public get Name(): string {
    return this.name;
  }

  public get Description(): string {
    return this.description;
  }

  public get Priority(): number {
    return this.priority;
  }

  public get ImageURL(): string {
    return this.imageURL;
  }
}

export class FortuneTeller extends Role {
  protected name = i18next.t("fortune-teller");
  protected description = i18next.t("fortune-teller-desc");
  protected priority = 0;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte3_90_90.png";
}

export class Witch extends Role {
  protected name = i18next.t("witch");
  protected description = i18next.t("witch-desc");
  protected priority = 0;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte5_90_90.png";
}

export class Werewolf extends Role {
  protected name = i18next.t("werewolf");
  protected description = i18next.t("werewolf-desc");
  protected priority = 0;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte2_90_90.png";
}

export class OrdinaryTownfolk extends Role {
  protected name = i18next.t("ordinary-townfolk");
  protected description = i18next.t("ordinary-townfolk-desc");
  protected priority = 0;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte1_90_90.png";
}

export class Cupid extends Role {
  protected name = i18next.t("cupid");
  protected description = i18next.t("cupid-desc");
  protected priority = 0;
  protected firstRoundOnly = true;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte7_90_90.png";
}

export class Hunter extends Role {
  protected name = i18next.t("hunter");
  protected description = i18next.t("hunter-desc");
  protected priority = 0;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte6_90_90.png";
}

export class LittleGirl extends Role {
  protected name = i18next.t("little-girl");
  protected description = i18next.t("little-girl-desc");
  protected priority = 0;
  protected firstRoundOnly = false;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte12_90_90.png";
}

export class Thief extends Role {
  protected name = i18next.t("thief");
  protected description = i18next.t("thief-desc");
  protected priority = 0;
  protected firstRoundOnly = true;
  protected imageURL = "https://www.loups-garous-en-ligne.com/jeu/assets/images/miniatures/carte11_90_90.png";
}
