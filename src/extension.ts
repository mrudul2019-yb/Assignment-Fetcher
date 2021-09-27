// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { deleteAssignment, fetchAssignment, saveProgress, submitProgress, switchAssignment, BASE, TIMER_INTERVAL } from './gitSet';
import { compileFile } from './Compile';
import { storeTime } from './store';


// import { Credentials } from './credentials';
const GITHUB_AUTH_PROVIDER_ID = 'github';
const SCOPES = ['repo'];
let startTime:number;
let latestTime:number;
let timerID:null|any= null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "assignment-fetcher" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const credentials = new Credentials();
	// await credentials.initialize(context);

	let disposable = vscode.commands.registerCommand('assignment-fetcher.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Assignment_Fetcher!');
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('assignment-fetcher.fetch-assignment', async () => { 
		try{
			let Assignment = await vscode.window.showInputBox({
				prompt: 'Input the Assignment Name',
				placeHolder: 'Assignment_x'
			});
			// let pswd = await vscode.window.showInputBox({
			// 	prompt: 'Input your github password/Personal Access Token',
			// 	placeHolder: 'Password'
			// });
			
			const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true });
			if(session)submitProgress(session.accessToken);
			if(Assignment && session){
				vscode.window.showInformationMessage(`Fetching....${Assignment}`);
				await fetchAssignment(Assignment, session.accessToken);
				vscode.window.showInformationMessage('Process Completed!');
			}
			// else vscode.window.showInformationMessage('Did not recieve Assignment name or Password');

		}
		catch(err){
			console.log(err);
			vscode.window.showInformationMessage('Oops something Went Wrong! : ' + err.message);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('assignment-fetcher.submit-progress', async()=>{
		try{
			console.log("submit Triggered");
			// let pswd = await vscode.window.showInputBox({
			// 	prompt: 'Input your github password/Personal Access Token',
			// 	placeHolder: 'Password'
			// });
			// if(pswd)submitProgress(pswd);

			const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true });
			if(session){
				await submitProgress(session.accessToken);
				vscode.window.showInformationMessage('Process Completed!')
			}
		}
		catch(err){
			vscode.window.showInformationMessage('Oops something Went Wrong! : ' + err.message);
		}

	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('assignment-fetcher.switch-assignment', async()=>{
		try{
			let Assignment = await vscode.window.showInputBox({
				prompt: 'Switch to which Assignment?',
				placeHolder: 'Assignment_x'
			});
			if(Assignment){
				await switchAssignment(Assignment);
				vscode.window.showInformationMessage('Process Completed!');
			}
		}
		catch(err){
			vscode.window.showInformationMessage('Oops something Went Wrong! : ' + err.message);	
		}

	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('assignment-fetcher.delete-assignment', async()=>{
		
		try{
			let Assignment = await vscode.window.showInputBox({
				prompt: 'Delete which Assignment?',
				placeHolder: 'Assignment_x'
			});
			// let pswd = await vscode.window.showInputBox({
			// 	prompt: 'Input your github password/Personal Access Token',
			// 	placeHolder: 'Password'
			// });
			const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true });

			if(Assignment && session){
				await deleteAssignment(Assignment, session.accessToken);
				vscode.window.showInformationMessage('Process Completed!');
			}
		}
		catch(err){
			vscode.window.showInformationMessage('Oops something Went Wrong! : ' + err.message);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('assignment-fetcher.compile-assignment', async()=>{
		// should this be async?
		try{
			// let filePath = await vscode.window.showInputBox({
			// 	prompt: 'path to file to be compiled',
			// 	placeHolder: './X.cpp'
			// });
			// vscode.workspace.workspaceFolders[0].uri.fsPath;

			if(vscode.window.activeTextEditor){
				let filePath = vscode.window.activeTextEditor.document.fileName;
				compileFile(filePath);
				vscode.window.showInformationMessage('compiled');
			}
		}
		catch(err){
			vscode.window.showInformationMessage('Oops something Went Wrong! : ' + err.message);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument)=>{
		console.log('save triggered event');
		saveProgress();
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('assignment-fetcher.change-git-user', async()=>{
		try{
			await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { clearSessionPreference: true });
			vscode.window.showInformationMessage('cleared preference');
		}
		catch(err){
			vscode.window.showInformationMessage('Oops something Went Wrong! : ' + err);
		}
	});
	context.subscriptions.push(disposable);
	
	if(BASE && TIMER_INTERVAL){
		const fswatcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(BASE, '*.cpp')); 
		console.log("attaching listener");
		fswatcher.onDidChange(()=>{
			console.log('smth changed??\n');

			if(timerID === null){
				startTime = Date.now();
				latestTime = Date.now();
				timerID = setTimeout(() => {storeTime(latestTime - startTime); timerID = null;}, <number>TIMER_INTERVAL*60*1000);
			}
			else{
				clearTimeout(timerID);
				latestTime = Date.now();
				timerID = setTimeout(() => {storeTime(latestTime - startTime); timerID = null;}, <number>TIMER_INTERVAL*60*1000);
			}
		});
	}

	



	// disposable = vscode.commands.registerCommand('assignment-fetcher.getGitHubUser', async () => {
	// 	// /**
	// 	//  * Octokit (https://github.com/octokit/rest.js#readme) is a library for making REST API
	// 	//  * calls to GitHub. It provides convenient typings that can be helpful for using the API.
	// 	//  * 
	// 	//  * Documentation on GitHub's REST API can be found here: https://docs.github.com/en/rest
	// 	//  */
	// 	// const octokit = await credentials.getOctokit();
	// 	// const userInfo = await octokit.users.getAuthenticated();

	// 	// vscode.window.showInformationMessage(`Logged into GitHub as ${userInfo.data.login} `);
	// 	// console.log(`${octokit}`);
	// 	// const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true });


	// });

	// context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() {
	if(timerID !== null){
		storeTime(latestTime - startTime);
		timerID = null;
	}
}
