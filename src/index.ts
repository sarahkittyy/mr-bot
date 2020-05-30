import Discord from 'discord.js';
import { config } from 'dotenv'; config();

const bot = new Discord.Client();


function login() {
	bot.login(process.env.TOKEN)
	.then(() => console.log('logged in...'))
	.catch(() => console.error('couldn\'t log in!!'));
}
login();