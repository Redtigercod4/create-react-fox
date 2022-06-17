#!/usr/bin/env node

const { execSync } = require('child_process');

const projectPath = process.argv[2];
const gitRepo = `https://github.com/Redtigercod4/create-react-fox.git`

function runCmd (command) {
    try {
        execSync(command, {stdio: 'inherit'})
    } catch (error) {
        console.error(`Whoops, we have an error: ${error}`)
        return false;
    }
    return true;
}

console.log(`Cloning the latest version of the repository in the folder ${projectPath}`);
const npmInit = runCmd(`git clone ${gitRepo} ${projectPath}`);

console.log(`Installing Dependencies...`)
const depsInit = runCmd(`cd ${projectPath} && npm install`)

if (!npmInit || !depsInit) {
    return process.exitCode(1)
}

console.log(`Congratulations. it has worked. You can now cd ${projectPath} and run npm start`)