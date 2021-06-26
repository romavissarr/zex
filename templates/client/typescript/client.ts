import { Client, Collection } from "discord.js";
import path from "path";
import ascii from "ascii-table";
import { readdirSync } from "fs";
import { Command, Event, Zex } from "../utils";
import ZexJSON from "../../zex.json";

class ExtendedClient extends Client {
	public Commands: Collection<string, Command> = new Collection();
	public Events: Collection<string, Event> = new Collection();
	public Aliases: Collection<string, Command> = new Collection();
	public Zex: Zex = ZexJSON;

	public async init() {
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
			const files = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".ts"));

			for (const file of files) {
				const { command } = require(`${commandPath}/${dir}/${file}`);
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
			const files = readdirSync(`${eventPath}/${dir}`).filter((file) => file.endsWith(".ts"));

			for (const file of files) {
				const { event } = require(`${eventPath}/${dir}/${file}`);
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

export default ExtendedClient;
