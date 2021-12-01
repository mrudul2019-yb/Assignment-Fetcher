// import * as vscode from 'vscode';
// const BASE:(string|undefined) = vscode.workspace.getConfiguration().get('Local Repository');

const fs = require("fs");
import { BASE } from './gitSet';

function jsonReader(filePath: string, cb: any) {
  fs.readFile(filePath, (err: any, fileData: string) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}


export function storeTime(activeTimeIncrement:number){
    
    activeTimeIncrement /= (1000*60);
    //input was in milliseconds, so converting to minutes
    // Sometimes the values gets updated as '}number' when updating just after assignment
    // is fetched, gets fixed if user clears that mess and rewrites ' "activeTime":0 '  part.
    // why??
    jsonReader(`${BASE}/studentData.json`, (err: any, student: { activeTime: number; }) => {
        if (err) {
          console.log(err);
          return;
        }
        student.activeTime += activeTimeIncrement;
        console.log("Updating");
        fs.writeFile(`${BASE}/studentData.json`, JSON.stringify(student, null, 2), (err: any) => {
          if (err) console.log("Error writing file:", err);
        });
      });
}

module.exports = { storeTime }