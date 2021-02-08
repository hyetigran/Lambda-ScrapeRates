const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { rateScrapper } = require("./scrape");

exports.handler = async (event) => {
  const items = await rateScrapper();
  const params = {
    Item: items,
    TableName: "ExchangeRate",
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};
