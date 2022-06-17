#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra')

const projectPath = process.argv[2];
const gitRepo = `https://github.com/Redtigercod4/create-react-fox.git`
const headerReplace = `"name": "${projectPath}",`

function runCmd(command) {
    try {
        execSync(command, { stdio: 'inherit' })
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

function tidyUp() {
    fs.readFileSync(`${projectPath}/package.json`, (data, error) => {
        if (error) console.error(`Oh no, that wasn't suppose to happen! ${error}`)
        const newFile =
            data.toString()
                .toReplace(
                    `"name": "create-react-fox",`, headerReplace);
        fs.writeFileSync(`${projectPath}/package.json`, newFile, (err) => err || true)
    })
}

if (!npmInit || !depsInit) return process.exitCode(1)

tidyUp()
console.log(`Congratulations. it has worked. You can now cd ${projectPath} and run npm start`)