import simpleGit, {SimpleGit, SimpleGitOptions} from 'simple-git';
const options: Partial<SimpleGitOptions> = {
    baseDir: '/home/mrudulmnair/Desktop/Lab/0026G',
    binary: 'git',
    maxConcurrentProcesses: 6,
 };
const git: SimpleGit = simpleGit(options);
// const git: SimpleGit = simpleGit();
const USER = 'mrudul2019';
const PASS = '';
const REPO = 'github.com/mrudul2019/0026G.git';

export async function fetch(name:string) {
    try{
        console.log(`working for ${name}??`);
        await git.checkout("master");
        // await git.clone("https://github.com/Tester-jr/Lab_Questions.git", "../Lab_Questions",  ['-b', name, '--single-branch']);
        // await git.addRemote('lab_question', '../Lab_Questions');
        await git.checkout(['-b', name]);
        // await git.pull('lab_question', name, ['--allow-unrelated-histories']);
        await git.pull("https://github.com/Tester-jr/Lab_Questions.git", name, ['--allow-unrelated-histories']);
        // await git.push('https://github.com/mrudul2019/0026G.git', name, ['-u']);
        await git.push(`https://${USER}:${PASS}@${REPO}`, name, ['-u']);
       
        // await git.removeRemote('lab_question');
        console.log('worked');

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {fetch};