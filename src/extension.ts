// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { deleteAssignment, fetchAssignment, saveProgress, submitProgress, switchAssignment } from './gitSet';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "assignment-fetcher" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
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
			let pswd = await vscode.window.showInputBox({
				prompt: 'Input your github password/Personal Access Token',
				placeHolder: 'Password'
			});
			if(Assignment && pswd){
				vscode.window.showInformationMessage(`Fetching....${Assignment}`);
				await fetchAssignment(Assignment, pswd);
				vscode.window.showInformationMessage('Process Completed!');
			}
			else vscode.window.showInformationMessage('Did not recieve Assignment name or Password');

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
			let pswd = await vscode.window.showInputBox({
				prompt: 'Input your github password/Personal Access Token',
				placeHolder: 'Password'
			});
			if(pswd)submitProgress(pswd);
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
			if(Assignment)switchAssignment(Assignment);
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
			let pswd = await vscode.window.showInputBox({
				prompt: 'Input your github password/Personal Access Token',
				placeHolder: 'Password'
			});
			if(Assignment && pswd)deleteAssignment(Assignment, pswd);
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
}


// this method is called when your extension is deactivated
export function deactivate() {}
