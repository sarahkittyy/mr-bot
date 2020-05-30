import Discord from 'discord.js';

import { error, success } from '../util';

async function f(msg: Discord.Message, args: string[]) {
	await msg.delete();
	
	console.log(args);
}

async function allowed(msg: Discord.Message): Promise<boolean> {
	return true;
}

const name: string = 'poll';
const desc: string = 'Create a server poll.';
const fmt: string = '<question>, <opt1>, [opt2], [opt3]...';

export { f, allowed, name, desc, fmt }; 