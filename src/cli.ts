import inquirer from "inquirer";
import chalk from 'chalk'
import { createProject } from './main.ts'

async function promptOptions() {
  const optionsProject = [];
  optionsProject.push({
    type: "list",
    name: "project",
    message: "Please choose an option! »",
    choices: ["Project", "Client"],
    default: "Project",
  });
  const projectData = await inquirer.prompt(optionsProject);
  if (projectData.project === "Project") {
    const optionsTemplate = [];
    optionsTemplate.push({
      type: "list",
      name: "template",
      message:
        "Please choose which programming language you wish to use for your project! »",
      choices: ["TypeScript", "JavaScript"],
      default: "TypeScript",
    });
    const templateData = await inquirer.prompt(optionsTemplate);
    const optionsPackageManager = [];
    optionsPackageManager.push({
      type: "list",
      name: "packageManager",
      message: "Please choose which project manager you wish to use! »",
      choices: ["yarn", "npm"],
      default: "yarn",
    });
    const packageManagerData = await inquirer.prompt(optionsPackageManager);
    const optionsName = [];
    optionsName.push({
      type: "input",
      name: "name",
      message: "Please choose a name for your project! »",
    });
    const nameData = await inquirer.prompt(optionsName);
    
    if(!nameData.name) {
        console.error('%s You must specify a project name!', chalk.red.bold("ERROR"))
        return
    }

    const optionsPrefix = [];
    optionsPrefix.push({
      type: "input",
      name: "prefix",
      message: "Please choose a prefix for your discord bot! »",
    });
    const prefixData = await inquirer.prompt(optionsPrefix);
    
    if(!prefixData.prefix) {
        console.error('%s You must specify a bot prefix!', chalk.red.bold("ERROR"))
        return
    }

    const optionsToken = [];
    optionsToken.push({
      type: "password",
      name: "token",
      message: "Please insert the token for your discord bot! »",
      mask: true,
    });
    const tokenData = await inquirer.prompt(optionsToken);
    
    if(!nameData.name) {
        console.error('%s You must specify a bot token!', chalk.red.bold("ERROR"))
        return
    }

    return {
      project: projectData.project,
      template: templateData.template,
      packageManager: packageManagerData.packageManager,
      name: nameData.name,
      prefix: prefixData.prefix,
      token: tokenData.token,
    };
  } else {
    const optionsTemplate = [];
    optionsTemplate.push({
      type: "list",
      name: "template",
      message:
        "Please choose which programming language you wish to use for your project! »",
      choices: ["TypeScript", "JavaScript"],
      default: "TypeScript",
    });
    const templateData = await inquirer.prompt(optionsTemplate);
    return {
      project: projectData.project,
      template: templateData.template,
    };
  }
}

export async function cli() {
  let options = await promptOptions();
  await createProject(options)
}
