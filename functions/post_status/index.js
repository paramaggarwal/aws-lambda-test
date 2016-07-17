console.log('Loading event');

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var table = 'test';
var id = 'status';

exports.handle = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var message = (event.message == undefined ? "NO MESSAGE" : event.message);

    // Update the item, unconditionally,
    var params = {
        TableName: table,
        Key: {
            "id": id
        },
        UpdateExpression: "set message = :m",
        ExpressionAttributeValues: {
            ":m": message
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            context.fail({error: err});
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            context.succeed();
        }
    });
}
