import { MessageEmbed } from 'discord.js';

export default function success(title: string, msg: string): MessageEmbed {
	return new MessageEmbed()
		.setTimestamp(new Date())
		.setTitle(title)
		.setColor('#00FF00')
		.setDescription(msg);
}