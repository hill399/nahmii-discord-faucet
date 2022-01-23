import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID as string;
const GUILD_ID = process.env.GUILD_ID as string;
const BOT_TOKEN = process.env.BOT_TOKEN as string;

const commands = [
	new SlashCommandBuilder().setName('drip').setDescription('Drip ETH to address in need!').addStringOption(option => option.setName('address').setDescription('Enter your address')),
	new SlashCommandBuilder().setName('driphelp').setDescription('List faucet help'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands'))
	.catch(console.error);