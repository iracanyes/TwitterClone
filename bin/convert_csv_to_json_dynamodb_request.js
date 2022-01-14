/**
 * Description: NetflixClone - Script for converting data in text file into json file for request import data to dynamoDB
 * Command 1: node scriptname.js
 * Command 2: aws dynamodb batch-write-item --request-items file://ProductCatalog.json 
 */
const fs = require("fs");
const path = require("path");
const files = require("./aws_db_config");

const createJsonFile = (file, putRequests, index = 0) => {
  const jsonContent = JSON.stringify({ [file.dbTabName]: putRequests });
  // Create json file with data for aws dynamoDB import data 
  const newJsonFilename = path.join(
    path.resolve("data","aws"), 
    file.type + (index > 0 ? "_"+ index : "") + "_aws-import-request.json"
  );
  
  // Check dest directory exists
  if(!fs.existsSync(path.resolve("data","aws"))){
    fs.mkdirSync(path.resolve("data","aws"), { recursive: true }, e => {
      console.error(`ERROR while creating directory [%s]`, path.resolve("data","aws"));
    });
  }

  // Save file to local system
  fs.writeFile(newJsonFilename, jsonContent, 'utf8', (e) => {
    if(e)
      console.warn("ERROR While writing file to system", e);

    console.log("File saved to path [" + newJsonFilename + "] !");
  });
};

const convertFiles = (file) => {
  // __dirname retourne le repértoire de stockage du script
  // console.log("\n__dirname\n", __dirname);

  // path.resolve retourne le chemin par rapport au répertoire de lancement de la commande
  // path.resolve result => C:\Projets\mobile\react-native\exercice\NetflixClone\docs\db
  // console.log("\npath.resolve\n", path.resolve("docs","db"));

  const filename = path.join(path.resolve("docs","db"), file.filename);
  //console.log("\nfilename\n", filename);
  


  fs.readFile(filename, 'utf8', (err, content) => {
      // Array of PutRequest object for aws dynamodb import json request
      const putRequests = [];

      //console.log("\nContent of the file\n",String(content));
      //console.log("\nType of content\n", typeof content);
      // All lines of the file
      if(content){
        //content.map((el,value) => console.log("Content map", el + " => " + value));

        // All lines of the file
        const allLines = content.split(/\r\n|\n/);
        //console.log("\nContent of the file\n", allLines);

        

        // Attributes of tab
        // Regex : utilisation de parenthèse capturante
        // (?<=valeur) pr les guillemets qui précédent la virgule 
        // (?=valeur) pour les guillemets qui suivent la virgule 
        const entries = allLines[0].split(/(?<=\"),(?=\")/);
        //console.log("\nentries\n",entries);
        //return;
        
        let properties = [];
        entries.map(el => {
            const line = el.slice(1, el.length - 1);
            const prop = { name: line.split(" ")[0], type: line.split(" ")[1][1]};
            properties.push(prop);
        });
        
        //console.log("\nproperties\n", properties);

        // All data lines
        const dataLines = allLines.splice(1);
        //console.log("\nAll data lines\n", dataLines);


        dataLines.map( el => {
          //console.log("dataLines map el", el);
          
          // data line array
          const dataLine = el.split(/(?<=\"),(?=\")/);
          //console.log("dataLines map dataLine", dataLine);
          
          // create item with data by attribute and type
          let item = {};
          for(let i = 0; i < properties.length; i++)
          {
            if(dataLine[i])
              item[properties[i].name] = { [properties[i].type] : dataLine[i].slice(1, dataLine[i].length - 1) };            
          }

          //console.log("Object.keys(item).length !== 0  ====> ",Object.keys(item).length !== 0);
          //console.log("Object.getPrototypeOf(item) !== Object.prototype ====> ",Object.getPrototypeOf(item) !== Object.prototype);
          
          // Check if object has no property
          if(item && Object.keys(item).length !== 0 && Object.getPrototypeOf(item) === Object.prototype){
            // Add a PutRequest object containing Item object with data for a db line 
            putRequests.push({"PutRequest": { "Item": item }});
          }          

        });

        //console.log("\nPutRequest Array\n", putRequests);

        // 25 Entries maximum by command 
        if(putRequests.length > 25){
          let i = Math.ceil(putRequests.length / 25);
          // Array of max 25 putRequests
          let res = [];
          let rest = putRequests;
          for(let a = 0; a < i; a++){
            // take first 25 
            if(a !== i - 1){
              arr = rest.slice(25 * a, 25 * (a + 1));           
            }else{
              // if it's last turn, take the rest of the array
              arr = rest.slice((25 * a));  
            }
            
            res.push(arr);
            
          }
          

          // Create Json file for each part
          res.map((el, index) => {
            createJsonFile(file, el, index);
          });
        }else{
          createJsonFile(file, putRequests);
        }

        

      }      
  });
};

try{
  files.map(el => {
    convertFiles(el);
  });
}catch(e){
  console.warn("error", e);
}

