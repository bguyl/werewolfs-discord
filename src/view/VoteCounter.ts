import { EventEmitter } from "events";
import { Player } from "./Player";

export class VoteCounter extends EventEmitter {
  private player: Player;
  private count: number;

  get Player(): Player {
    return this.player;
  }

  public add() {
    this.count++;
    this.emit("changed");
  }

  public remove() {
    this.count--;
    if (this.count < 0) { throw new Error("Vote counter can't be negative"); }
    this.emit("changed");
  }

}
