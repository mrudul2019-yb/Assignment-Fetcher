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
// const USER = 'mrudul2019';
// const PASS = "";
// const REPO = 'github.com/mrudul2019/0026G.git';

export async function fetch(name:string) {
    try{
        let LabRepo:(string|undefined) = vscode.workspace.getConfiguration().get('Lab Repository');

        console.log(`working for ${name}??`);
        await git.checkout("master");
        // // await git.clone("https://github.com/Tester-jr/Lab_Questions.git", "../Lab_Questions",  ['-b', name, '--single-branch']);
        // // await git.addRemote('lab_question', '../Lab_Questions');
        await git.checkout(['-b', name]);
        // // await git.pull('lab_question', name, ['--allow-unrelated-histories']);
        await git.pull(LabRepo, name, ['--allow-unrelated-histories']);
        await git.push('origin', name, ['-u']);
        // await git.push(`https://${USER}:${PASS}@${REPO}`, name, ['-u']);
        // await git.removeRemote('lab_question');
        console.log('worked');

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {fetch};