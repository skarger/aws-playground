/* set ACCESS_KEY_ID and SECRET_ACCESS_KEY in environment before running */

var AWS = require('aws-sdk');

var options = {
    apiVersion: 'latest',
    accessKeyId: process.env.ACCESS_KEY_ID, 
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1'
}

var dynamodb = new AWS.DynamoDB(options);

function completeDemo() {
    process.exit();
}

function createCelebrities() {
    var params = {
      TableName: 'CELEBRITIES_SDK', /* required */
      AttributeDefinitions: [ /* required */
        {
          AttributeName: 'NAME', /* required */
          AttributeType: 'S' /* required */
        },
        /* more items */
      ],
      KeySchema: [ /* required */
        {
          AttributeName: 'NAME', /* required */
          KeyType: 'HASH' /* required */
        },
        /* more items */
      ],
      ProvisionedThroughput: { /* required */
        ReadCapacityUnits: 1, /* required */
        WriteCapacityUnits: 1 /* required */
      },
      StreamSpecification: {
        StreamEnabled: false
      }
    };
    dynamodb.createTable(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });    
};

var itemsInserted = 0;
function incrementItemsInserted() {
    itemsInserted++;
}
function allItemsInserted() {
    return (itemsInserted >= 6);
}

function insertItem(itemAttributes) {
    var params = {
      Item: itemAttributes,
      TableName: 'CELEBRITIES_SDK', /* required */
      ReturnConsumedCapacity: 'TOTAL',
      ReturnItemCollectionMetrics: 'SIZE',
      ReturnValues: 'NONE'
    };
    dynamodb.putItem(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data);           // successful response
        incrementItemsInserted();
        }
    });
}

function insertStars() {
    insertItem({ /* required */
        'NAME': {
            S: 'EDWARD-NORTON'
        },
        'FULL_NAME': { /* AttributeValue */
            S: 'Edward Norton',
        },
        'PICTURE_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/stars/images/edward-norton.jpg',
        },
        'RESUME_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/stars/resumes/edward-norton-resume.txt',
        },
        'MOST_POPULAR_MOVIE': { /* AttributeValue */
            S: 'Fight Club',
        },
        /* anotherKey: ... */
    });

    insertItem({ /* required */
        'NAME': {
            S: 'JESSICA-CHASTAIN'
        },
        'FULL_NAME': { /* AttributeValue */
            S: 'Jessica Chastain',
        },
        'PICTURE_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/stars/images/jessica-chastain.jpg',
        },
        'RESUME_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/stars/resumes/jessica-chastain-resume.txt',
        },
        'MOST_POPULAR_MOVIE': { /* AttributeValue */
            S: 'The Tree of Life',
        },
        /* anotherKey: ... */
    });

    insertItem({ /* required */
        'NAME': {
            S: 'ANNA-KENDRICK'
        },
        'FULL_NAME': { /* AttributeValue */
            S: 'Anna Kendrick',
        },
        'PICTURE_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/stars/images/anna-kendrick.jpg',
        },
        'RESUME_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/stars/resumes/anna-kendrick-resume.txt',
        },
        'MOST_POPULAR_MOVIE': { /* AttributeValue */
            S: 'Up In the Air',
        },
        /* anotherKey: ... */
    });
};

function insertNobels() {
    insertItem({ /* required */
        'NAME': {
            S: 'ERNEST-HEMINGWAY'
        },
        'FULL_NAME': { /* AttributeValue */
            S: 'Ernest Hemingway',
        },
        'PICTURE_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/nobels/images/ernest-hemingway.jpg',
        },
        'RESUME_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/nobels/resumes/ernest-hemingway-resume.txt',
        },
        'YEAR_WON_NOBEL': { /* AttributeValue */
            S: '1954',
        },
        'NOBEL_FIELD': { /* AttributeValue */
            S: 'Literature',
        },
        /* anotherKey: ... */
    });

    insertItem({ /* required */
        'NAME': {
            S: 'FREDERICK-SANGER'
        },
        'FULL_NAME': { /* AttributeValue */
            S: 'Frederick Sanger',
        },
        'PICTURE_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/nobels/images/frederick-sanger.jpg',
        },
        'RESUME_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/nobels/resumes/frederick-sanger-resume.txt',
        },
        'YEAR_WON_NOBEL': { /* AttributeValue */
            S: '1958, 1980',
        },
        'NOBEL_FIELD': { /* AttributeValue */
            S: 'Chemistry',
        },
        /* anotherKey: ... */
    });

    insertItem({ /* required */
        'NAME': {
            S: 'MAX-BORN'
        },
        'FULL_NAME': { /* AttributeValue */
            S: 'Max Born',
        },
        'PICTURE_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/nobels/images/max-born.jpg',
        },
        'RESUME_URL': { /* AttributeValue */
            S: 'https://s3.amazonaws.com/stephen.karger-people/nobels/resumes/max-born-resume.txt',
        },
        'YEAR_WON_NOBEL': { /* AttributeValue */
            S: '1954',
        },
        'NOBEL_FIELD': { /* AttributeValue */
            S: 'Physics',
        },
        /* anotherKey: ... */
    });
};


function insertCelebrities() {
    insertStars();
    insertNobels();
};

function createTableIfNeeded() {
    var params = {
      TableName: 'CELEBRITIES_SDK' /* required */
    };
    dynamodb.waitFor('tableNotExists', params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
            console.log("Calling createCelebrities...");
            createCelebrities();
        }
    });
};

function insertDataWhenReady() {
    var params = {
      TableName: 'CELEBRITIES_SDK' /* required */
    };
    dynamodb.waitFor('tableExists', params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
            console.log("Calling insertCelebrities...");
            insertCelebrities();
        }
    });
};

function queryInsertedItems(hashKey, queryConsoleTable, querySDKTable) {
    function paramsFor(table) {
        return {
          TableName: table, /* required */
          ConsistentRead: true || false,
          KeyConditions: {
            'NAME': {
              ComparisonOperator: 'EQ', /* required */
              AttributeValueList: [
                { /* AttributeValue */
                  S: hashKey
                },
                /* more items */
              ]
            },
            /* anotherKey: ... */
          },
          ReturnConsumedCapacity: 'TOTAL',
          ScanIndexForward: true || false,
          Select: 'ALL_ATTRIBUTES'
        };
    };

    if (queryConsoleTable) {
        dynamodb.query(paramsFor('CELEBRITIES_CONSOLE'), function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
                console.log("queryInsertedItems...");
                console.log(data);           // successful response
                console.log(data['Items']);           // successful response
            };
        });
    }

    if (querySDKTable) {
        dynamodb.query(paramsFor('CELEBRITIES_SDK'), function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log("queryInsertedItems...");
                console.log(data);           // successful response
                console.log(data['Items']);           // successful response
            };
        });
    }
};

function updateNobelYear(newValue) {
    var params = {
      Key: { /* required */
        'NAME': { /* AttributeValue */
          S: 'ERNEST-HEMINGWAY',
        },
        /* anotherKey: ... */
      },
      TableName: 'CELEBRITIES_SDK', /* required */
      ReturnConsumedCapacity: 'TOTAL',
      ReturnItemCollectionMetrics: 'SIZE',
      ReturnValues: 'NONE',
      ExpressionAttributeNames: {
          '#attribute_name': 'YEAR_WON_NOBEL'
      },
      ExpressionAttributeValues: {
          ':year': {
            S: newValue
          } 
      },
      UpdateExpression: 'SET #attribute_name = :year'
    };
    dynamodb.updateItem(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     {
        console.log("updateNobelYear to " + newValue + " ...");
        console.log(data);           // successful response
        queryInsertedItems('ERNEST-HEMINGWAY', false, true);
     }
    });
};

function createInsertDemo() {
    createTableIfNeeded();
    insertDataWhenReady(); 
    queryInsertedItems('ANNA-KENDRICK', true, true);
    setTimeout(function() {
        if (allItemsInserted()) completeDemo();
    }, 3000);
};

function updateLogCloudwatchDemo() {
    // this will log several updates in CloudWatch
    // note that even though it traverses the array in order.
    // the updates aren't necessarily processed by AWS in order
    years = ['2001', '2002', '2003', '2004']
    for (var i = 0; i < years.length; i++) {
        updateNobelYear(years[i]);
    };
};

function deleteDemo() {
    deleteLambdaFunctions();
    deleteDynamoDBTables();
};

function deleteLambdaFunctions() {
    console.log("deleteLambdaFunctions...");
    var options = {
        apiVersion: 'latest',
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'us-east-1'
    };
    var lambda = new AWS.Lambda(options);

    var params;

    lambda.listFunctions({}, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
    });

    params = {
        EventSourceArn: 'arn:aws:dynamodb:us-east-1:205055394910:table/CELEBRITIES_SDK/stream/2015-10-18T15:23:03.132',
        FunctionName: 'logTableOperations',
    };
    lambda.listEventSourceMappings(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);           // successful response
            if (data['EventSourceMappings'].length > 0) {
                var uuid = data['EventSourceMappings'][0]['UUID'];
                var deleteParams = {
                    UUID:  uuid
                };
                lambda.deleteEventSourceMapping(deleteParams, function(err, data) {
                      if (err) console.log(err, err.stack); // an error occurred
                        else     console.log(data);           // successful response
                });
            }
        }
    });

    params = {
      FunctionName: 'logTableOperations', /* required */
    };

    lambda.listFunctions({}, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);           // successful response
            if (data['Functions'].length > 0) {
                lambda.deleteFunction(params, function(err, data) {
                  if (err) console.log(err, err.stack); // an error occurred
                  else     console.log(data);           // successful response
                });
            }
        }
    });


};

function deleteDynamoDBTables() {
    console.log("deleteDynamoDBTables...");
    deleteTableRequest('CELEBRITIES_SDK');
    deleteTableRequest('CELEBRITIES_CONSOLE');
};

function deleteTableRequest(tableName) {
    var params = {
      TableName: tableName /* required */
    };
    dynamodb.describeTable(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data);           // successful response
        if (data['Table']) {
            console.log('deleting table ' + params['TableName']);
            dynamodb.deleteTable(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
            });
        }
      }
    });
};

(function main() {
    //createInsertDemo();
    //updateLogCloudwatchDemo();
    deleteDemo();
})();
