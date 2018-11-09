import Discord from "discord.js";
import fs from "fs";
import i18next from "i18next";
import path from "path";
import readline from "readline";
import { eventsHandler } from "./controller/EventsHandler";

export const client = new Discord.Client();

interface IBotConfiguration {
  token: string;
  langage?: string;
}

// Start the bot
getConfiguration().then((config: IBotConfiguration) => {
  new Promise((resolve, reject) => {
    i18next.init({
      fallbackLng: "en",
      lng: config.langage,
      resources: {
        en: {
          translation: require(path.resolve(__dirname, "i18n", "en.json"))
        },
        fr: {
          translation: require(path.resolve(__dirname, "i18n", "fr.json"))
        }
      }
    }, (err, t) => {
      if (err) { return reject(err); }
      return resolve(t);
    });
  }).catch((error) => {
    console.error(error);
  }).then(() => {
    eventsHandler(client);
    return client.login(config.token);
  }).catch((error) => {
    console.error(error);
  });
}).catch((error) => {
  console.error(error);
});

/**
 * Read the Discord Bot Token from config.json or ask it to the user and save it.
 */
async function getConfiguration(): Promise<IBotConfiguration> {
  let config: IBotConfiguration;

  // Try to read the token field from the config file
  try {
    config = require(path.resolve(__dirname, "config.json"));
    if (config) { return Promise.resolve(config); }
  } catch (error) {
    console.warn("The file config.json doen't exist. Creating one ...");
  }

  // Ask the token to the user
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  config = {
    token: await new Promise((resolve) => {
      rl.question("What is your Discord Token ? ", (answer: string): void => {
        rl.close();
        resolve(answer);
      });
    }) as string
  };

  // Save the token in the config file
  fs.writeFileSync(path.resolve(__dirname, "config.json"), JSON.stringify(config));
  return Promise.resolve(config);
}
