import Discord from 'discord.js';

import { error, success } from '../util';

function f(msg: Discord.Message, args: string[]) {
	return msg.channel.send(error('not implemented yet', ''));
}

function allowed(msg: Discord.Message): boolean {
	return true;
}

const name: string = 'poll';
const desc: string = 'Create a server poll.';

export { f, allowed, name, desc }; 