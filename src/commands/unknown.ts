import Discord from 'discord.js';

import { error } from '../util';

export default function unknown(msg: Discord.Message, args: string[]) {
	return msg.channel.send(error(
		'Command not found!',
		`Use ${process.env.PREFIX}help for help.`,
	));
}