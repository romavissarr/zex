const { Client, Collection } = require("discord.js")
const path = require("path")
const ascii = require("ascii-table")
const { readdirSync } = require('fs')
const ZexJSON = require('../../zex.json')

module.exports = class ExtendedClient extends Client {
	Commands = new Collection();
	Events = new Collection();
	Aliases = new Collection();
	Zex = ZexJSON;

	async init() {
		// Ascii Table

		let tableCommands = new ascii("Commands");
		tableCommands.setHeading("Command", " Load status");

		let tableEvents = new ascii("Events");
		tableEvents.setHeading("Event", " Load status");

		// Discord Login

		this.login(this.Zex.token);

		// Commands

		const commandPath = path.join(__dirname, "..", "commands");

		readdirSync(commandPath).forEach(async (dir) => {
			const files = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".js"));

			for (const file of files) {
				const command = require(`${commandPath}/${dir}/${file}`);
				this.Commands.set(command.name, command);
				tableCommands.addRow(file, "✅");

				if (command.aliases.length !== 0) {
					command.aliases.forEach((alias) => {
						this.Aliases.set(alias, command);
					});
				}
			}
		});

		// Events

		const eventPath = path.join(__dirname, "..", "events");

		readdirSync(eventPath).forEach((dir) => {
			const files = readdirSync(`${eventPath}/${dir}`).filter((file) => file.endsWith(".js"));

			for (const file of files) {
				const event = require(`${eventPath}/${dir}/${file}`);
				tableEvents.addRow(file, "✅");
				this.Events.set(event.name, event);
				this.on(event.name, event.run.bind(null, this));
			}
		});

		// Logging

		console.log(tableCommands.toString());
		console.log(tableEvents.toString());
	}
}
