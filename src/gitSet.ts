import simpleGit, {SimpleGit, SimpleGitOptions} from 'simple-git';
import * as vscode from 'vscode';
// const BASE = '/home/mrudulmnair/Desktop/Lab/0026G';
const BASE:(string|undefined) = vscode.workspace.getConfiguration().get('Local Repository');

const options: Partial<SimpleGitOptions> = {
    baseDir: BASE,
    binary: 'git',
    maxConcurrentProcesses: 6,
 };
const git: SimpleGit = simpleGit(options);
// const git: SimpleGit = simpleGit();

export async function fetch(name:string) {
    try{
        let LabRepo:(string|undefined) = vscode.workspace.getConfiguration().get('Lab Repository');

        console.log(`working for ${name}??`);
        await git.checkout("main");
        await git.checkout(['-b', name]);
        await git.pull(LabRepo, name, ['--allow-unrelated-histories']);
        await git.push('origin', name, ['-u']);
        console.log('worked');

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {fetch};