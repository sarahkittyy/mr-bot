import Discord from 'discord.js';

import { info, error } from '../util';

import { availableCommands } from './';

async function f(msg: Discord.Message, args: string[]) {
	let { VERSION, PREFIX } = process.env;

	let available = availableCommands(msg);
	let cmdList: string = available
		.map(cmd => {
			return `• \`${PREFIX}${cmd.name}\` -- ${cmd.desc}`;
		})
		.join('\n');

	return msg.channel.send(info(
		`mr-bot v${VERSION}`,
		`**Available commands:**

		${cmdList}`,
	));
}

async function allowed(msg: Discord.Message): Promise<boolean> {
	return true;
}

const name: string = 'help';
const desc: string = 'This help menu';

export { f, allowed, name, desc };