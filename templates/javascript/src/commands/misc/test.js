const color = require('../../configuration/colors.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "test",
    description: "A simple testing command!",
    aliases: [""],

    run: async(client, message, args) => {
        message.channel.send({
            embed: {
                color: color.black,
                description: `Test!`
            }
        })
    }
}