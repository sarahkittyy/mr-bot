import { MessageEmbed } from 'discord.js';

export default function info(title: string, msg: string): MessageEmbed {
	return new MessageEmbed()
		.setTimestamp(new Date())
		.setTitle(title)
		.setColor('#F699CD')
		.setDescription(msg);
}