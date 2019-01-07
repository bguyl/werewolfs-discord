import Discord from "discord.js";

export class EmojisManager {

  public static getInstance(client?: Discord.Client): EmojisManager {
    if (EmojisManager.instance) { return EmojisManager.instance; }
    if (!client) { throw new Error("There is no EmojisManager instance and the client was not provided"); }
    return EmojisManager.instance = new EmojisManager(client);
  }

  private static instance: EmojisManager;
  private client: Discord.Client;
  private numbers: Discord.Emoji[] = new Array(15);

  private constructor(client: Discord.Client) {
    this.client = client;
    this.numbers[1] = this.client.emojis.get("531929114546798595") as Discord.Emoji;
    this.numbers[2] = this.client.emojis.get("531929187628482601") as Discord.Emoji;
    this.numbers[3] = this.client.emojis.get("531929216225116170") as Discord.Emoji;
    this.numbers[4] = this.client.emojis.get("531929244188672011") as Discord.Emoji;
    this.numbers[5] = this.client.emojis.get("531929271581802496") as Discord.Emoji;
    this.numbers[6] = this.client.emojis.get("531929314015576085") as Discord.Emoji;
    this.numbers[7] = this.client.emojis.get("531929416721367040") as Discord.Emoji;
    this.numbers[8] = this.client.emojis.get("531929459188563989") as Discord.Emoji;
    this.numbers[9] = this.client.emojis.get("531929497830948873") as Discord.Emoji;
    this.numbers[10] = this.client.emojis.get("531929527966892041") as Discord.Emoji;
    this.numbers[11] = this.client.emojis.get("531929566298767411") as Discord.Emoji;
    this.numbers[12] = this.client.emojis.get("531929600641728523") as Discord.Emoji;
    this.numbers[13] = this.client.emojis.get("531929655012360203") as Discord.Emoji;
    this.numbers[14] = this.client.emojis.get("531929684783661056") as Discord.Emoji;
  }

  public get Numbers(): Discord.Emoji[] {
    return this.numbers;
  }
}
