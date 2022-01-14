/**
 * Description: Script for converting data in text file into json file for request import data to dynamoDB
 * Command 1: node scriptname.js
 * This commond will use AWS CLI
 * Command 2: aws dynamodb batch-write-item --request-items file://ProductCatalog.json
 */
const { DynamoDBClient, BatchWriteItemCommand} = require("@aws-sdk/client-dynamodb");

const { readdir, createReadStream } = require("fs");
const { join, resolve } = require("path");
const { exec } = require("child_process");
const filesInfo = require("./aws_db_config");
const users = require("../data/json/users.json");
const fleets = require("../data/json/fleets.json");
const tweets = require("../data/json/tweets.json");

const data = [users, fleets, tweets];
const dynamodbClient = new DynamoDBClient({ region : "eu-west-1"});

const createPutRequests = async(arr) => {
    //console.log("createPutRequests arr\n", arr)
    let n= 0;
    let curr15 = [];
    arr.Items.map(async (el, index, tab) => {
      console.log(`el[${index}]\ntab.length => ${tab.length}\nn => ${n}`);
      if (index !== tab.length - 1 && n < 15) {
        console.log(`el[${index}]\n`, el);
        const putRequest = {PutRequest: {Item: el}};
        n++;
        curr15.push(putRequest);
      } else {
        const putRequest = {PutRequest: {Item: el}};
        // Add el to curr15
        curr15.push(putRequest);

        console.log("index\n", index);
        console.log("curr15 before sendBatchWriteItem\n", curr15);
        if (index === tab.length - 1 || curr15.length === 15) {
          // batch-write-item for curr15
          await sendBatchWriteItem(curr15);
        }

        // Reset curr15 and n
        curr15 = [];
        n = 0;
      }
    });
};

const sendBatchWriteItem = async (curr15) => {
    const fileInfo = filesInfo.find(el => el.type.includes(curr15[0].PutRequest.Item["__typename"].S));
    console.log("sendBatchWriteItem fileInfo\n", fileInfo);
    console.log("sendBatchWriteItem curr15", curr15);

    const params = {
      RequestItems: {
        [fileInfo.dbTabName] : curr15
      }
    };



    try{
      const data = await dynamodbClient.send(new BatchWriteItemCommand(params));
      console.log(`\nDatabase [${fileInfo.dbTabName}] updated!\n\nSuccess, items inserted!\n`, data);
    }catch (e) {
      console.error("\nBatchWriteItem error\n", e);
    }


};

try{
    // console.log("Program data\n", data);
    data.map((arr) => {
        //console.log("Program arr\n", arr);
        createPutRequests(arr);
    });
}catch (e) {
    console.error("Code error\n", e);
}




