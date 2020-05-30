import Discord from 'discord.js';

import { error, success, asyncForEach } from '../util';
import parse from 'parse-duration';

async function f(msg: Discord.Message, args: string[]) {
	await msg.delete();
	
	if (args.length < 5) {
		return msg.channel.send(error(
			'Invalid format.',
			`\`${process.env.PREFIX}poll ${fmt}\``
		));
	}
	
	let guild = msg.guild;
	
	let q = args[1];
	let dur = parse(args[2], 'ms');
	let opts: { emote: string | Discord.Emoji, opt: string }[] = [];
	// parse all opts
	for (let i = 3; i < args.length; i += 2) {
		let emoteIdentifier: any = args[i + 1];
		let re = /:(\w+):(\d+)/;
		if (re.test(emoteIdentifier)) {
			emoteIdentifier = msg.client.emojis.cache.get(
				 re.exec(emoteIdentifier)[2]
			);
		}
		
		opts.push({
			emote: emoteIdentifier,
			opt: args[i]
		});
	}

	// construct the message embed
	let embed = new Discord.MessageEmbed()
		.setTitle(q)
		.setTimestamp(new Date())
		.setColor('#00ccff')
		.setAuthor(msg.author.username)
		.setThumbnail(msg.author.avatarURL());
	let optDisplays: string[] = [];
	opts.forEach(opt => {
		optDisplays.push(
			`• ${opt.emote.toString()} ${opt.opt}`	
		);
	});
	embed.setDescription(optDisplays.join('\n'));

	/// send the message 
	let sentMessage: Discord.Message = await msg.channel.send(embed);
	
	/// create reaction listeners for the message
	const filter = (r: Discord.MessageReaction) => {
		return !opts.find((v) => v.emote === r.emoji.identifier);
	};
	sentMessage.awaitReactions(filter, {
		time: dur
	})
	.then((v) => {
		// count total reactions
		let total: number = 0;
		v.forEach(r => total += r.count);
		total -= v.size;

		let results: string[] = []; 
		let max: Discord.MessageReaction[] = [];

		results.push(`Total votes: ${total}`);
		v.forEach(r => {

			let cOpt = opts.find(o => o.emote.toString() === r.emoji.toString())?.opt;
			if (!cOpt) {
				return;
			}

			if (!max || max.length == 0) {
				max = [];
				max.push(r)
			} else if (r.count > max[0].count) {
				max = [];
				max.push(r)
			} else if (r.count == max[0].count) {
				max.push(r);
			}
			
			let percent: number = total != 0 ? (r.count - 1) / total : 0;
			results.push(`• ${r.emoji.toString()} ${cOpt} -- ${(percent * 100).toFixed(2)}%`);
		});
		let reducedResults: string[] = [];
		max.forEach((r: Discord.MessageReaction) => {
			let cOpt = opts.find(o => o.emote.toString() === r.emoji.toString())?.opt;
			reducedResults.push(`• ${r.emoji.toString()} ${cOpt}\n`);
		});
		results.push(`Winner(s): ${reducedResults.length != 0 ? '\n' + reducedResults : 'N/A'}`);

		return msg.channel.send(success(
			`Poll resolved: ${q}`,
			results.join('\n')
		));
	});

	/// react with the options
	await asyncForEach(opts, async (opt) => {
		await sentMessage.react(opt.emote);	
	});
}

async function allowed(msg: Discord.Message): Promise<boolean> {
	return true;
}

const name: string = 'poll';
const desc: string = 'Create a server poll.';
const fmt: string = '<question>, <duration>, <opt1>, <emote1>, [opt2], [emote2], [opt3]...';

export { f, allowed, name, desc, fmt }; 