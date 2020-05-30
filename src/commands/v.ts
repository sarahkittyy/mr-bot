import Discord from 'discord.js';

import { info } from '../util';

function f(msg: Discord.Message, args: string[]) {
	return msg.channel.send(info(
		`mr-bot v${process.env.VERSION}`,
		`Developed by <@135895345296048128>
		https://github.com/sarahkittyy/mr-bot
		`,
	));
}

function allowed(msg: Discord.Message): boolean {
	return true;
}

const name: string = 'v';
const desc: string = 'Bot version info';

export { f, allowed, name, desc };