import { EventEmitter } from "events";
import _ from "lodash";
import { Player } from "./Player";
import { Cupid, FortuneTeller, Hunter, LittleGirl, OrdinaryTownfolk, Role, Thief, Werewolf, Witch } from "./Role";

export class Game extends EventEmitter {
  private static counter = 0;
  private id: number;
  private owner: Player;
  private players: Player[] = [];
  private started: boolean = false;

  constructor(owner: Player) {
    super();
    this.owner = owner;
    this.id = Game.counter ++;
  }

  public get Id(): number {
    return this.id;
  }

  public get NbPlayers(): number {
    return this.players.length;
  }

  public addPlayer(player: Player): void {
    if (this.started) { return; }
    this.players.push(player);
    if (this.players.length > 2) {
      this.emit("enoughPlayers");
    }
    this.emit("playerAdded");
  }

  public removePlayer(player: Player): void {
    if (this.started) { return; }
    _.remove(this.players, (p: Player) => p.Id === player.Id);
    if (this.players.length < 3) {
      this.emit("notEnoughPlayers");
    }
    this.emit("playerRemoved");
  }

  public start() {
    if (this.players.length < 3) { throw new Error("Not enought players to start a game."); }
    this.started = true;
    this.emit("started");

    const roles = this.generateRoleSet(this.players.length);

    this.players.forEach((player) => {
      player.joinGame(this.id);
      player.Role = roles.pop() as Role;
    });

    this.players = _.sortBy(this.players, (p: Player) => p.Role.Priority);
    for (const player of this.players) {
      // player.Role.play();
    }

  }

  private generateRoleSet(amount: number): Role[] {
    const roles: Role[] = [];
    roles.push(new Werewolf());
    roles.push(new Werewolf());
    roles.push(new Witch());
    roles.push(new FortuneTeller());
    roles.push(new Cupid());
    roles.push(new Hunter());
    if (amount > 6) {
      roles.push(new LittleGirl());
    }
    if (amount > 7) {
      for (let i = 0; i < amount - 7; i++) {
        roles.push(new OrdinaryTownfolk());
      }
    }
    return _.shuffle(roles);
  }
}
