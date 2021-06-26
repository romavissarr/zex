/** @format */

import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import execa from 'execa';
import Listr from 'listr'
import { promisify } from "util";
import { projectInstall, install } from "pkg-install";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProject(options) {
  if (options.project === "Project") {
    options = {
      ...options,
      targetDirectory: process.cwd(),
    };

    const templateDirectory = path.resolve(
      __dirname,
      "../templates",
      options.template.toLowerCase()
    );
    options.templateDirectory = templateDirectory;

    await access(templateDirectory, fs.constants.R_OK);

    await copyTemplateFiles(options);

    const file = path.resolve(
      process.cwd(),
      'zex.json'
    )
    const packageJSON = path.resolve(
      process.cwd(),
      'package.json'
    )

fs.writeFileSync(file, `{
  "name": "${options.name}",
  "manager": "${options.packageManager}",
  "language": "${options.template}",
  "token": "${options.token}",
  "prefix": "${options.prefix}"
}`)

if (options.template.toLowerCase() === 'typescript') {
  fs.writeFileSync(packageJSON, `{
  "name": "${options.name}",
  "main": "./src/index.ts",
  "license": "MIT",
  "scripts": {
    "start": "ts-node-dev --respawn --transpile-only --poll ./src/index.ts"
  },
  "dependencies": {
    "discord.js": "12.5.3",
    "ascii-table": "0.0.9"
  },
  "devDependencies": {
    "ts-node": "^10.0.0",
    "ts-node-dev": "1.1.6",
    "@types/node": "^15.12.4",
    "typescript": "^4.3.4"
  }
}`)
} else {
  fs.writeFileSync(packageJSON, `{
  "name": "${options.name}",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "nodemon ./src/index.js"
  },
  "dependencies": {
    "nodemon": "2.0.7",
    "discord.js": "12.5.3",
    "ascii-table": "0.0.9"
  }
}`)
}

    const tasks = new Listr([
        {
            title: 'Copying project files',
            task: () => copyTemplateFiles(options)
        },
        {
            title: 'Installing dependencies',
            task: () => projectInstall({
                prefer: options.packageManager,
                cwd: options.targetDirectory
            }),
        }
    ])

    await tasks.run()

    console.log("%s Happy coding!", chalk.green.bold("DONE"));
    return true;
  } else {
    options = {
      ...options,
      targetDirectory: process.cwd(),
    };

    const templateDirectory = path.resolve(
      __dirname,
      "../templates/client",
      options.template.toLowerCase(),
    );
    options.templateDirectory = templateDirectory;

    await access(templateDirectory, fs.constants.R_OK);

    const tasks = new Listr([
      {
        title: 'Copying project file',
        task: () => copyTemplateFiles(options)
      }
    ])

    await tasks.run()
    
    await copyTemplateFiles(options);

    console.log("%s Happy coding!", chalk.green.bold("DONE"));
    return true;
  }
}
