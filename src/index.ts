import Discord from 'discord.js';
import { config } from 'dotenv'; config();

import { maybeParseCommand, command } from './commands';

const bot = new Discord.Client();

bot.on('message', async (msg: Discord.Message) => {
	//* validate the message is not from a bot
	if (msg.author.bot) return;

	//* try parsing the message for a command
	let cmd: string[] = maybeParseCommand(msg.content);
	if (cmd.length == 0) {
		return;
	} else {
		return command(cmd[0], msg)(msg, cmd);
	}
});

bot.on('disconnect', () => {
	console.log('disconnected! re-trying');
	login();
});

bot.on('error', () => {
	console.log('error! retrying');
	login();
});

function login() {
	bot.login(process.env.TOKEN)
	.then(() => console.log('logged in...'))
	.catch(() => console.error('couldn\'t log in!!'));
}
login();