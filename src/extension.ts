// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { fetch } from './gitSet';
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
	disposable = vscode.commands.registerCommand('assignment-fetcher.gitSet', async () => { 
		try{
			let Assignment = "Assignment_4";
			vscode.window.showInformationMessage('Fetching....');
			await fetch(Assignment); 
			vscode.window.showInformationMessage('Successfully Fetched!');

		}
		catch(err){
			vscode.window.showInformationMessage('Oops something Went Wrong!');
		}
	});
	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
