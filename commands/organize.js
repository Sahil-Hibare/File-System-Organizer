let types = require("./utility")
let fs = require("fs");
let path = require("path")

function organize(dirpath){
   
    //////create organize folder
    let destpath;
                      ///////verify input directory path
    if(dirpath == undefined){
        dirpath = process.cwd();
    }
     let doesexist =  fs.existsSync(dirpath);
    if(doesexist == false){
        console.log("kindly enter the correct path")
        return ;
     }
   
     ////2.create  - > organize folder
        destpath = path.join(dirpath,"organized_files")
        if(fs.existsSync(destpath) == false){
          fs.mkdirSync(destpath);
        }
    
    
    organizeHelper(dirpath,destpath);
}

/// identify categories of all the files present in the inpur directory

function organizeHelper(src,dest){
       let children = fs.readdirSync(src);
       for(let i = 0;i<children.length;i++){
           let childpath = path.join(src,children[i]);

          let isFile =  fs.lstatSync(childpath).isFile();
          if(isFile){
            let ctgry = getCategory(childpath);
             console.log(children[i], " - >",ctgry);
             sendFiles(childpath, dest, ctgry);
          }

       }

}

 /////copy/cut files to that specific category folder inside organized directory 
function sendFiles(srcfilepath, dest, category){
    let catpath = path.join(dest,category);
    if(fs.existsSync(catpath) == false){
        fs.mkdirSync(catpath);
    }
    let filename = path.basename(srcfilepath);
    let destfilepath = path.join(catpath,filename);
    fs.copyFileSync(srcfilepath,destfilepath);

}

function getCategory(name){
    let ext = path.extname(name);
   ext = ext.slice(1);
   for(let type  in types){
     let typeArray = types[type];
     for(let i = 0; i<typeArray.length;i++){
         if(ext == typeArray[i]){
            return type;
         }
     }
   
   }
   return "others";
}

module.exports = {
    OrganizeKey : organize
}