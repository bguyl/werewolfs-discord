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
    this.numbers[1] = this.client.emojis.get("523239310292549642") as Discord.Emoji;
    this.numbers[2] = this.client.emojis.get("523239310431092738") as Discord.Emoji;
    this.numbers[3] = this.client.emojis.get("523239310405795841") as Discord.Emoji;
    this.numbers[4] = this.client.emojis.get("523239310472773657") as Discord.Emoji;
    this.numbers[5] = this.client.emojis.get("523239310590476288") as Discord.Emoji;
    this.numbers[6] = this.client.emojis.get("523239310695202831") as Discord.Emoji;
    this.numbers[7] = this.client.emojis.get("523239310720368671") as Discord.Emoji;
    this.numbers[8] = this.client.emojis.get("523239310795866115") as Discord.Emoji;
    this.numbers[9] = this.client.emojis.get("523239310686945311") as Discord.Emoji;
    this.numbers[10] = this.client.emojis.get("523239310942797825") as Discord.Emoji;
    this.numbers[11] = this.client.emojis.get("523239310934409227") as Discord.Emoji;
    this.numbers[12] = this.client.emojis.get("523239311232204815") as Discord.Emoji;
    this.numbers[13] = this.client.emojis.get("523239311500378132") as Discord.Emoji;
    this.numbers[14] = this.client.emojis.get("523239311123021836") as Discord.Emoji;
  }

  public get Numbers(): Discord.Emoji[] {
    return this.numbers;
  }
}
