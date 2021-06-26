const color = require('../../configuration/colors.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ready",
    description: "A ready event!",

    run: async(client) => {
        console.log(`${client.user.tag} has logged on!`)
    }
}