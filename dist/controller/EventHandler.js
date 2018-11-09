"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
function initialize(client) {
    client.on("ready", () => {
        console.log(i18next_1.default.t("ready"));
    });
}
exports.initialize = initialize;
