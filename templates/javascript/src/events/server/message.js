const color = require('../../configuration/colors.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "message",
    description: "A simple message event!",

    run: async(client, message) => {
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(client.Zex.prefix)
        ) return;

        const args = message.content.slice(client.Zex.prefix.length).trim().split(/ +/g);

        const baseCommand = args.shift().toLowerCase();

        const command = client.Commands.get(baseCommand) || client.Aliases.get(baseCommand);
        if (command) command.run(client, message, args);
    }
}