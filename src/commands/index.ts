import Discord from 'discord.js';

import { error } from '../util';

/// see if the message is a command, and parse it
/// returns empty if it's not a command
export function maybeParseCommand(msg: string): string[] {
	// if it starts with the command prefix
	if (msg.startsWith(process.env.PREFIX) && !msg.startsWith(process.env.PREFIX + ' ')) {
		// split the prefix off
		let cmd: string = msg.substr(process.env.PREFIX.length).split(' ')[0];
		let args: string[] = msg.substr(process.env.PREFIX.length + cmd.length)
			.split(',')
			.map(s => s.trim());
		return [cmd, ...args];
	} else {
		return [];
	}
}

//! load all commands
import unknown from './unknown';
import * as poll from './poll';
import * as v from './v';
import * as help from './help';

export type CommandFunction = 
	(msg: Discord.Message, args: string[]) => any;
export interface Command {
	name: string;
	desc: string;
	allowed: (msg: Discord.Message) => Promise<boolean>;	
	f: CommandFunction;
};

const fns = {
	poll,
	v,
	help	
};

/// returns the command function determined by it's name (name)
export async function command(name: string, msg: Discord.Message): Promise<CommandFunction> {
	let f = fns[name];
	if (!f) {
		return unknown;	
	} else if (!(await f.allowed(msg))) {
		return () => {
			msg.channel.send(error(
				'You don\'t have the correct permissions to run that :(',
				''
			));
		};
	} else {
		return f.f; 
	}
}

/// returns all commands runnable by the user
export function availableCommands(msg: Discord.Message): Command[] {
	// filter by allowed
	let filtered = Object.keys(fns)
		.filter(k => fns[k].allowed(msg))
		.map(k => fns[k]);
	return filtered;
};