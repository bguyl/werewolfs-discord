"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmojisManager {
    constructor(client) {
        this.numbers = new Array(15);
        this.client = client;
        this.numbers[1] = this.client.emojis.get("531929114546798595");
        this.numbers[2] = this.client.emojis.get("531929187628482601");
        this.numbers[3] = this.client.emojis.get("531929216225116170");
        this.numbers[4] = this.client.emojis.get("531929244188672011");
        this.numbers[5] = this.client.emojis.get("531929271581802496");
        this.numbers[6] = this.client.emojis.get("531929314015576085");
        this.numbers[7] = this.client.emojis.get("531929416721367040");
        this.numbers[8] = this.client.emojis.get("531929459188563989");
        this.numbers[9] = this.client.emojis.get("531929497830948873");
        this.numbers[10] = this.client.emojis.get("531929527966892041");
        this.numbers[11] = this.client.emojis.get("531929566298767411");
        this.numbers[12] = this.client.emojis.get("531929600641728523");
        this.numbers[13] = this.client.emojis.get("531929655012360203");
        this.numbers[14] = this.client.emojis.get("531929684783661056");
    }
    static getInstance(client) {
        if (EmojisManager.instance) {
            return EmojisManager.instance;
        }
        if (!client) {
            throw new Error("There is no EmojisManager instance and the client was not provided");
        }
        return EmojisManager.instance = new EmojisManager(client);
    }
    get Numbers() {
        return this.numbers;
    }
}
exports.EmojisManager = EmojisManager;
//# sourceMappingURL=EmojisManager.js.map