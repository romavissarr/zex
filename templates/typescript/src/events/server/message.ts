import { Event, Command } from "../../utils"
import * as color from "../../configuration/colors.json"
import { MessageEmbed, Message } from "discord.js"

export const event: Event = {
    name: "message",
    description: "A simple message event!",

    run: async(client, message: Message) => {
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(client.Zex.prefix)
        ) return;

        const args = message.content.slice(client.Zex.prefix.length).trim().split(/ +/g);

        const baseCommand = args.shift().toLowerCase();

        const command = client.Commands.get(baseCommand) || client.Aliases.get(baseCommand);
        if (command) (command as Command).run(client, message, args);
    }
}