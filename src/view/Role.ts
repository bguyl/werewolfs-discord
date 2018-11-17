import { Role as RoleModel } from "../model/Role";

export class Role {
  private roleModel: RoleModel;

  constructor(roleModel: RoleModel) {
    this.roleModel = roleModel;

    this.roleModel.on("fortuneteller-turn", () => {});

    this.roleModel.on("witch-turn", () => {});

    this.roleModel.on("werewolf-turn", () => {});

    this.roleModel.on("cupid-turn", () => {});

    this.roleModel.on("littlegirl-turn", () => {});

    this.roleModel.on("thief-turn", () => {});
  }
}
