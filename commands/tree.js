let fs = require("fs");
let path = require("path");

function tree(dirpath){

    if(dirpath == undefined){
     dirpath = process.cwd();
        
    }
     let doesexist =  fs.existsSync(dirpath);
    if(doesexist == false){
        console.log("kindly enter the correct path")
        return ;
     }
     treeHelper(dirpath, "");


}


function treeHelper(dirpath, indent){
    ///is file or folder
     let isfile =   fs.lstatSync(dirpath).isFile();
     if(isfile ==  true){
       let  fileName =  path.basename(dirpath);
        console.log(indent ,"|-",fileName);
     }else{
        let dirName = path.basename(dirpath);
        console.log(indent + "|_ "+ dirName);
        let children = fs.readdirSync(dirpath);
        for(let i =0;i<children.length;i++){
              let childpath = path.join(dirpath, children[i]);
              treeHelper(childpath, indent+ "\t");
        }
     }
}

module.exports = {
    treeKey : tree
}