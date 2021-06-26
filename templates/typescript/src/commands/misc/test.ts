import { Command } from "../../utils"
import * as color from "../../configuration/colors.json"
import { MessageEmbed, Message } from "discord.js"

export const command: Command = {
    name: "test",
    description: "A simple testing command!",
    aliases: ["t"],

    run: async(client, message, args) => {
        message.channel.send({
            embed: {
                color: color.black,
                description: `Test!`
            }
        })
    }
}