import { Event } from "../../utils"
import * as color from "../../configuration/colors.json"
import { MessageEmbed } from "discord.js"

export const event: Event = {
    name: "ready",
    description: "A ready event!",

    run: async(client) => {
        console.log(`${client.user.tag} has logged on!`)
    }
}