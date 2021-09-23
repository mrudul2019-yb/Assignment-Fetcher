import * as vscode from 'vscode';

let terminal:undefined|vscode.Terminal;
export function compileFile(filePath: string){
    console.log(filePath);
    if(terminal === undefined )terminal = vscode.window.createTerminal(`Assignment Terminal`);
    terminal.sendText(`g++ ${filePath} 2>&1 | tee error.log`);
}

module.exports = { compileFile }