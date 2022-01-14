/**
 * Description:
 * Read CSV files in directory, create AWS DynamoDB Put-item object from csv data and execute aws dynamodb batch-write-item
 * for an array of 15 PutRequest object
 * This node program is run from the racine directory of the project and csv files must be in directory [data:db] with the command:
 *    $ node bin/aws_dynamodb_batch-write-item.js
 */
const { readdir, createReadStream } = require("fs");
const { join, resolve } = require("path");
const csv = require("csv-parser");
const async = require("async");
const { DynamoDBClient, BatchWriteItemCommand,  } = require("@aws-sdk/client-dynamodb");
const filesInfo = require("./aws_db_config");

const dynamodbDocClient = new DynamoDBClient({ region: "eu-west-1"});


// Read directory to get list of files
const readDirectory = () => {

  readdir(resolve("data", "db"), (err, files) => {
    if(err){
      console.error(`ERROR reading directory [${resolve("data", "aws")}]\n${err}`);
      return;
    }

    console.log("files", files);
    // cre
    csvFromFiles(files);

  });
};

// For each file, read file's data and create put-item request of each line of data
// before executing a batch-write-item for each object (Max 25 put-request by batch-write-item)
const csvFromFiles = (files) => {
  try{
    if(files.length === 0 ) console.error("\nNo csv files!!!\n");
    files.map( file => {
      let props = [];
      let results = [];

      readCsvFile(file);

    });
  }catch (e) {
    console.error("\ncsvFromFiles error\n",e );
  }
};

const readCsvFile = async (file) => {
  let n = 0;
  let curr15 = [];
  let results = [];
  createReadStream(join(resolve("data", "db"), file))
    .pipe(csv({
      columns: true,
      delimiter: ","
    }))
    .on("data", data => {
      //console.log("\npipe data\n", data);
      if(data.length <= 0){
        console.warn("\nLine with no data\n",data);
        return;
      }
      const putRequest = createPutRequestObject(data);
      //console.log("\nPutRequest itme\n", putRequest.PutRequest);
      if(curr15.length < 15 ){
        curr15[n] = putRequest;
        n++;
      }else{
        console.log(`\n${file}\n\nSuccess, items inserted!\n`, curr15.length);
         sendBatchWriteRequest(curr15, file);
        n = 0;
        curr15= [];
        //return;


      }

      results.push(data);
    })
    .on("end", () => {
      //console.log("\nreadCsvFile onEnd results\n", results);
      //console.log("\nreadCsvFile onEnd results\n", results.length);

      // send request for the last
      console.log(`\n${file}\n\nSuccess, items inserted!\n`, curr15.length);
      sendBatchWriteRequest(curr15, file);

    })
    .on("error", (e) => {
      console.error("\nfs.createReadStream error\n", e);
    });
};

const createPutRequestObject = (data) => {
  if(data.length === 0 ){
    console.error(`No data received !`);
    return;
  }

  try{

    let item = {};
    for(const [prop, value] of Object.entries(data)) {
      //console.log(`\ndata.map prop => value\n${prop} => ${value}\ndata.map prop.type\n${prop.split(" ")[1][1]}`);
      item[prop.split(" ")[0]] = { [prop.split(" ")[1][1]]: value };
    }

    return { PutRequest: { Item: item }};

  }catch (e) {
    console.error(`\nCreatePutRequestObject error\n`, e);
  }

};

const sendBatchWriteRequest = async (curr15, file) => {
  console.log("filesInfo\n", filesInfo);
  const fileInfo = filesInfo.find( data => file.includes(`${data.type}`));

  const params = {
    RequestItems: {
      [fileInfo.dbTabName]: curr15
    }
  };

  try{
    const data = await dynamodbDocClient.send(new BatchWriteItemCommand(params));
    console.log(`\n${file}\n\nSuccess, items inserted!\n`, data);
  }catch (e) {
    console.error("\nBatchWriteItem error\n", e);
  }
};

try{
  readDirectory();
}catch (e) {
  console.error("\nMain program error ERROR\n", e);
}