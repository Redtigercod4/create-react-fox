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
fs.rmSync(`${projectPath}/package-lock.json`)
const depsInit = runCmd(`cd ${projectPath}`);

function fileAmend() {
  const packageJson = fs.readFileSync(`${projectPath}/package.json`, "utf-8");

  const updatePackageJson = packageJson
    .replace(`"name": "create-react-fox"`, `"name": "${projectPath}"`)
    .replace(`"version": "0.0.15"`, `"version": "0.0.1"`)
    .replace(
      `"description": "This is a template React Boilerplate that can be cloned via the npx tools."`,
      `"description": ""`
    ).replace(`"bin": "./bin/template.js"`, `"bin": ""`);

  const updateFile = fs.writeFileSync(
    `${projectPath}/package.json`,
    updatePackageJson
  );
  fs.rmSync(`${projectPath}/bin/template.js`)
  fs.rmdirSync(`${projectPath}/bin`)
  return updateFile;
}

console.log(`Tidying up the mess...`);
const fileInit = fileAmend();
runCmd(`git remote remove origin && npm install`)

if (!npmInit || !depsInit || !fileInit) return console.error(`Whoops`);

console.log(
  `Congratulations. it has worked. You can now cd ${projectPath} and run npm start`
);
