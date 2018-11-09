import Discord from "discord.js";

export class ChannelsManager {

  public static getInstance(client?: Discord.Client): ChannelsManager {
    if (ChannelsManager.instance) { return ChannelsManager.instance; }
    if (!client) { throw new Error("There is no ChannelsManager instance and the client was not provided"); }
    return ChannelsManager.instance = new ChannelsManager(client);
  }

  private static instance: ChannelsManager;
  private general?: Discord.TextChannel;
  private gamesCategory?: Discord.CategoryChannel;
  private client: Discord.Client;
  private guild: Discord.Guild;

  private constructor(client: Discord.Client) {
    this.client = client;
    this.guild = client.guilds.first();
    this.createOrFind("general", "text").then((chan: Discord.GuildChannel) => {
      this.general = chan as Discord.TextChannel;
    });
    this.createOrFind("games", "category").then((chan: Discord.GuildChannel) => {
      this.gamesCategory = chan as Discord.CategoryChannel;
    });
  }

  public get General(): Discord.TextChannel {
    if (!this.general) { throw new Error("Cannot find the General channel"); }
    return this.general;
  }

  public get GamesCategory(): Discord.CategoryChannel {
    if (!this.gamesCategory) { throw new Error("Cannot find the Game category"); }
    return this.gamesCategory;
  }

  public get Client(): Discord.Client {
    return this.client;
  }

  public get Guild(): Discord.Guild {
    return this.guild;
  }

  /**
   * Remove the channels the bot previously created
   */
  public async deleteAll() {
    this.guild.channels
    .filter((c: Discord.GuildChannel) => {
      return (c.name.toLocaleLowerCase().match(/.*__.*/) && c.type === "text") ? true : false;
    })
    .forEach((c: Discord.GuildChannel) => c.delete());
  }

  /**
   * Create or find a Discord channel
   */
  private async createOrFind(name: string, type: "text" | "category" | "voice"): Promise<Discord.GuildChannel> {
    let chan;
    try {
      chan = this.guild.channels.find((c: Discord.GuildChannel) => c.name === name && c.type === type);
    // tslint:disable-next-line:no-empty
    } catch (err) {}
    if (!chan) {
      chan = await this.guild.createChannel(name, type);
    }
    return Promise.resolve(chan);
  }
}
