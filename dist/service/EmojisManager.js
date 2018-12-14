"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmojisManager {
    constructor(client) {
        this.numbers = new Array(15);
        this.client = client;
        this.numbers[1] = this.client.emojis.get("523239310292549642");
        this.numbers[2] = this.client.emojis.get("523239310431092738");
        this.numbers[3] = this.client.emojis.get("523239310405795841");
        this.numbers[4] = this.client.emojis.get("523239310472773657");
        this.numbers[5] = this.client.emojis.get("523239310590476288");
        this.numbers[6] = this.client.emojis.get("523239310695202831");
        this.numbers[7] = this.client.emojis.get("523239310720368671");
        this.numbers[8] = this.client.emojis.get("523239310795866115");
        this.numbers[9] = this.client.emojis.get("523239310686945311");
        this.numbers[10] = this.client.emojis.get("523239310942797825");
        this.numbers[11] = this.client.emojis.get("523239310934409227");
        this.numbers[12] = this.client.emojis.get("523239311232204815");
        this.numbers[13] = this.client.emojis.get("523239311500378132");
        this.numbers[14] = this.client.emojis.get("523239311123021836");
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