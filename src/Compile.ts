import * as vscode from 'vscode';
const path = require("path");

let terminal:undefined|vscode.Terminal = undefined;
// export function compileFile(filePath: string){
//     console.log(filePath);
//     if(terminal === undefined )terminal = vscode.window.createTerminal(`Assignment Terminal`);
//     terminal.sendText(`g++ ${filePath} 2>&1 | tee error.log`);
// }
export async function createContainer(containerName: string, assignmentPath:string){
    console.log(`container ${containerName} being created`);

    if(terminal === undefined || terminal.exitStatus)terminal = vscode.window.createTerminal(`Assignment Terminal`);
    terminal.sendText(`docker start ${containerName} || docker create -it --name ${containerName} --mount type=bind,source=${assignmentPath},target=/usr/src/cpp_test cpp_test bash`);
}
export async function compileFile(containerName: string, assignmentPath:string){
    
    //  save resultLog file before running or vscode wont make the changes reflect by giving priority to the non saved resultlog contents
    if(terminal === undefined || terminal.exitStatus)terminal = vscode.window.createTerminal(`Assignment Terminal`);
    // createContainer(containerName, assignmentPath);
    // terminal.sendText(`docker exec -it ${containerName} make`);
    
    // Check if this is platform independent
    // assumes the image is named cpp_test. so student have to execute ONLY "docker build -t cpp_test ." at the start else wont work  
    let realAssignmentPath = assignmentPath.split(path.sep).join(path.posix.sep);;
    terminal.sendText(`(docker start ${containerName} || (docker create -it --name ${containerName} --mount type=bind,source=${realAssignmentPath},target=/usr/src/cpp_test cpp_test bash && docker start ${containerName}) ) && docker exec -it ${containerName} make`);
}
module.exports = { createContainer, compileFile }



// docker build -t cpp_test .
// docker create -it --name assignment_container  --mount type=bind,source=/home/mrudulmnair/Desktop/fresh/freshStudent,target=/usr/src/cpp_test cpp_test bash
// docker start assignment_container
// docker exec -it assignment_container make 