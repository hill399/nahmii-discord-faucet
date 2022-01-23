# Nahmii Discord ETH Bot

Repo for bot which can drip ETH to nahmii addresses if the following conditions are met:

- Address has a single transaction - a minting of tokens from the nahmii bridge (not ETH)
- Address has 0 ETH balance.

Rationale for this deployment is to assist community members who have bridged tokens to try out nahmii but have realised that they are unable to move funds until the account has an ETH balance. Affects a small subset of activity, but is a helpful tool to reduce friction for new users.

Built with discord.js.

### Requirements

- Node v16+

### Discord Setup

- Follow instructions to setup bot and generate tokens via discord.js guide [HERE](https://discordjs.guide/preparations/setting-up-a-bot-application.html).

### Deploy

Install dependencies with:

```sh
npm install
```

Fill in the user-specific details in the `example.prod.env` (production) or `example.test.env` (testnet) file:

`PRIVATE_KEY` : Private key of funded L2 account. Will be the account that ETH is dispensed from.

`BOT_TOKEN` : Token generating when setting up bot on discord.

`CLIENT_ID` : Client ID created when setting up the bot on discord.

`GUILD_ID` : Guild ID of server on discord.

Rename file to `.env` (note: file may seem to disappear from folder, this is normal).

Deploy bot slash commands using:

```sh
npm run slash
```

Build and run the bot server using:

```sh
npm run start
```
