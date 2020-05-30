import Discord from 'discord.js';

import { error, success } from '../util';

async function f(msg: Discord.Message, args: string[]) {
	await msg.delete();
}

async function allowed(msg: Discord.Message): Promise<boolean> {
	return true;
}

const name: string = 'poll';
const desc: string = 'Create a server poll.';

export { f, allowed, name, desc }; 