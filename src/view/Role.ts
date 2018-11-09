import { Role as RoleModel } from "../model/Role";

export class Role {
  private roleModel: RoleModel;

  constructor(roleModel: RoleModel) {
    this.roleModel = roleModel;
  }
}
