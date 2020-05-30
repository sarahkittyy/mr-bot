import { MessageEmbed, Message } from 'discord.js';

export default function error(title: string, error: string): MessageEmbed {
	return new MessageEmbed()
		.setTimestamp(new Date())
		.setTitle(title)
		.setColor('#FF0000')
		.setDescription(error);
}