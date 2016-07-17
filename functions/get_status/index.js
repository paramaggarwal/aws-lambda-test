console.log('Loading event');

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var table = 'test';
var id = 'status';

exports.handle = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    // Update the item, unconditionally,
    var params = {
        TableName: table,
        Key: {
            "id": id
        }
    };

    console.log("Getting the item...");
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
            context.fail({error: err});
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            context.succeed({message: data});
        }
    });
}
