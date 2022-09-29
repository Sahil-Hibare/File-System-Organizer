#!/usr/bin/env node
/////file system organizer  project

//////help command

////////tree - > "directories"
//////organize -> directory path'
////help 
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help")
let OrganizeObj = require("./commands/organize")
let treeObj = require("./commands/tree")



let inpArr = process.argv.slice(2);

let command = inpArr[0];

switch (command){
    case "tree":
        treeObj.treeKey(inpArr[1]);
        break;
    case "organize":
        OrganizeObj.OrganizeKey(inpArr[1]);
        break;
    case "help":
         helpObj.helpKey();
        break;
    default:
       console.log("please input right command you can refer help");
       break;
}






   





