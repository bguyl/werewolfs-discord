import { EventEmitter } from "events";
import { Role } from "./Role";

export class Player extends EventEmitter {
  private static counter = 0;
  private role?: Role;
  private id: number;
  private gameId?: number;
  private ingame: boolean = false;

  constructor() {
    super();
    this.id = Player.counter ++;
  }

  public get Id(): number {
    return this.id;
  }

  public get Role(): Role {
    if (!this.role) { throw new Error("Attempt to access to player's role before assign it"); }
    return this.role;
  }

  public set Role(role: Role) {
    this.role = role;
    this.emit("roleSet");
  }

  public joinGame(gameId: number) {
    this.ingame = true;
    this.gameId = gameId;
    this.emit("gameJoined", gameId);
  }
}
