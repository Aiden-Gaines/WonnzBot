// Heroku sets these up already, so this is needed for testing on a local server
if (process.env.NODE_ENV != 'PRODUCTION') {
	require('dotenv').config();
}

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

// Log this so we know the bot is running
client.on('ready', async () => {
	console.log(`Logged in successfully as ${client.user.username}!`);
});

client.on('message', (msg) => {
	// Split the message up into seperate words
	const msgWords = msg.content.split(' ');

	const similarWordList = [
		['their', 'thier', 'they\'re', 'theyre', 'there'],
		['your', 'you\'re', 'youre', 'ur'],
	];

	// If the last word in the message ends in er, do this
	if (msg.content.endsWith('er')) {
		const wordIndex = msgWords.length - 1;
		const word = msgWords[wordIndex];
		msg.reply(`${word}? I barely know her!`);
	}

	// If the message contains any shitty english word, do this
	// Iterate through every word in the message
	msgWords.forEach((word) => {
		// Iterate through the list of lists that has similar words in it
		similarWordList.forEach((similarWords) => {
			// If the list includes the word, reply with a different word from that list
			if (similarWords.includes(word)) {
				let replyWord;
				do {
					// Pick a random word from the list of words that are similar
					replyWord = similarWords[Math.floor(Math.random() * similarWords.length)];
				// Make sure the word is not the one that was said, so repeat this until we get a new one
				} while (replyWord == word);

				msg.reply(replyWord + '*');
			}
		});
	});
});