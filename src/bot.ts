import * as dotenv from "dotenv";
import { log } from "./logger";
import { Client, CommandInteraction, Intents, Formatters } from "discord.js";
import { validateAddressConditions } from "./accounts";
import { sendEtherToAddress, getWalletAddress } from "./wallet";
import { utils } from "ethers";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN as string;
const NAHMII_URL = process.env.NAHMII_URL as string;

export const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

const getSlashAddress = (interaction: CommandInteraction) => {
  if (!interaction.options.getString("address")) return null;
  const address = interaction.options.getString("address") as string;

  if (!utils.isAddress(address)) return null;
  return address;
};

export const setupBot = async () => {
  bot.once("ready", () => {
    log.info("Discord bot started...");
  });

  bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "driphelp") {
      const walletAddress = await getWalletAddress();
      interaction.reply(
        `Drip ETH to address on nahmii mainnet 🚀\nTo qualify you must meet the following: \n\n- Have bridged tokens ONCE \n- Have 0 ETH in account\n\nThis is a community faucet, help by donating ETH to ${walletAddress}`
      );
    }

    if (commandName !== "drip") return;

    const address = getSlashAddress(interaction);
    if (!address) return interaction.reply("Enter a valid address!");

    if (!(await validateAddressConditions(address))) return interaction.reply('Address not eligible, see /driphelp for criteria ❌');

    interaction.reply("Processing your request...");

    const hash = await sendEtherToAddress(address);

    if (!hash) {
      interaction.editReply("Error processing drip, try again later ☠️");
      return;
    }

    const txResponse = Formatters.hyperlink(
      "Drip Complete, click to view TX 🪙",
      `${NAHMII_URL}/tx/${hash}`,
      ""
    );

    interaction.editReply(txResponse);

    return;
  });

  bot.login(BOT_TOKEN);
};
