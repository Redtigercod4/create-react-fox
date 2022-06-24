#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

const projectPath = process.argv[2];
const gitRepo = `https://github.com/Redtigercod4/create-react-fox.git`;

function runCmd(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Whoops, we have an error: ${error}`);
    return false;
  }
  return true;
}

console.log(
  `Cloning the latest version of the repository in the folder ${projectPath}`
);
const npmInit = runCmd(`git clone ${gitRepo} ${projectPath}`);

console.log(`Installing Dependencies...`);
const depsInit = runCmd(`cd ${projectPath} && npm install`);

function fileAmend() {
  let oldHeader = {
    "name": "create-react-fox",
    "version": "0.0.5",
    "description":
      "This is a template React Boilerplate that can be cloned via the npx tools.",
  };
  let newHeader = {
    "name": `"${projectPath}"`,
    "version": "0.0.1",
    "description": "",
  };
  const packageJson = fs
    .readFileSync(`${projectPath}/package.json`, "utf-8")
    .replace(oldHeader, newHeader);

  const updateFile = fs.writeFileSync(
    `${projectPath}/package.json`,
    packageJson
  );
  return updateFile;
}

console.log(`Tidying up the mess...`)
const updatedFile = fileAmend();
console.log(updatedFile)


if (!npmInit || !depsInit) return process.exitCode(1);

console.log(
  `Congratulations. it has worked. You can now cd ${projectPath} and run npm start`
);
