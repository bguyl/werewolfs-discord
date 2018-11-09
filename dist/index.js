"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
const i18next_1 = __importDefault(require("i18next"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const EventsHandler_1 = require("./controller/EventsHandler");
exports.client = new discord_js_1.default.Client();
// Start the bot
getConfiguration().then((config) => {
    new Promise((resolve, reject) => {
        i18next_1.default.init({
            fallbackLng: "en",
            lng: config.langage,
            resources: {
                en: {
                    translation: require(path_1.default.resolve(__dirname, "i18n", "en.json"))
                },
                fr: {
                    translation: require(path_1.default.resolve(__dirname, "i18n", "fr.json"))
                }
            }
        }, (err, t) => {
            if (err) {
                return reject(err);
            }
            return resolve(t);
        });
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        EventsHandler_1.eventsHandler(exports.client);
        return exports.client.login(config.token);
    }).catch((error) => {
        console.error(error);
    });
}).catch((error) => {
    console.error(error);
});
/**
 * Read the Discord Bot Token from config.json or ask it to the user and save it.
 */
function getConfiguration() {
    return __awaiter(this, void 0, void 0, function* () {
        let config;
        // Try to read the token field from the config file
        try {
            config = require(path_1.default.resolve(__dirname, "config.json"));
            if (config) {
                return Promise.resolve(config);
            }
        }
        catch (error) {
            console.warn("The file config.json doen't exist. Creating one ...");
        }
        // Ask the token to the user
        const rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
        config = {
            token: yield new Promise((resolve) => {
                rl.question("What is your Discord Token ? ", (answer) => {
                    rl.close();
                    resolve(answer);
                });
            })
        };
        // Save the token in the config file
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "config.json"), JSON.stringify(config));
        return Promise.resolve(config);
    });
}
//# sourceMappingURL=index.js.map