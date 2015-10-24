/* set ACCESS_KEY_ID and SECRET_ACCESS_KEY in environment before running */

var AWS = require('aws-sdk');

options = {
    apiVersion: 'latest',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1'
};

var simpledb = new AWS.SimpleDB(options);

var demoComplete = false;

function createPeople() {
    console.log("createPeople...");
    var params = {
        DomainName: 'PEOPLE'
    };

    simpledb.createDomain(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
            listMyDomains();
        }
    });
};

function listMyDomains() {
    console.log("listMyDomains...");
    var params = {
        MaxNumberOfDomains: 10,
        NextToken: 'START'
    };

    simpledb.listDomains(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
            insertPeople();
        }
    });
}

function insertPeople() {
    console.log("insertPeople...");
    var params = {
        DomainName: 'PEOPLE', /* required */
        Items: [
        {
            Name: 'EDWARD-NORTON', /* required */ 
            Attributes: [ /* required */
                {
                    Name: 'FULL_NAME', /* required */
                    Value: 'Edward Norton', /* required */
                    Replace: true || false
                },
                {
                    Name: 'MOST_POPULAR_MOVIE', /* required */
                    Value: 'Fight Club', /* required */
                    Replace: true || false
                },
                {
                    Name: 'PICTURE_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/stars/images/edward-norton.jpg', /* required */
                    Replace: true || false
                },
                {
                    Name: 'RESUME_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/stars/resumes/edward-norton-resume.txt', /* required */
                    Replace: true || false
                },
                /* more items */
            ],
        },
        {
            Name: 'JESSICA-CHASTAIN', /* required */ 
            Attributes: [ /* required */
                {
                    Name: 'FULL_NAME', /* required */
                    Value: 'Jessica Chastain', /* required */
                    Replace: true || false
                },
                {
                    Name: 'MOST_POPULAR_MOVIE', /* required */
                    Value: 'The Tree of Life', /* required */
                    Replace: true || false
                },
                {
                    Name: 'PICTURE_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/stars/images/jessica-chastain.jpg', /* required */
                    Replace: true || false
                },
                {
                    Name: 'RESUME_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/stars/resumes/jessica-chastain-resume.txt', /* required */
                    Replace: true || false
                },
                /* more items */
            ],
        },
        {
            Name: 'ANNA-KENDRICK', /* required */ 
            Attributes: [ /* required */
                {
                    Name: 'FULL_NAME', /* required */
                    Value: 'Anna Kendrick', /* required */
                    Replace: true || false
                },
                {
                    Name: 'MOST_POPULAR_MOVIE', /* required */
                    Value: 'Up In The Air', /* required */
                    Replace: true || false
                },
                {
                    Name: 'PICTURE_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/stars/images/anna-kendrick.jpg', /* required */
                    Replace: true || false
                },
                {
                    Name: 'RESUME_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/stars/resumes/anna-kendrick-resume.txt', /* required */
                    Replace: true || false
                },
                /* more items */
            ],
        },
        {
            Name: 'ERNEST-HEMINGWAY', /* required */ 
            Attributes: [ /* required */
                {
                    Name: 'FULL_NAME', /* required */
                    Value: 'Ernest Hemingway', /* required */
                    Replace: true || false
                },
                {
                    Name: 'YEAR_WON_NOBEL', /* required */
                    Value: '1954', /* required */
                    Replace: true || false
                },
                {
                    Name: 'NOBEL_FIELD', /* required */
                    Value: 'Literature', /* required */
                    Replace: true || false
                },
                {
                    Name: 'PICTURE_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/nobels/images/ernest-hemingway.jpg', /* required */
                    Replace: true || false
                },
                {
                    Name: 'RESUME_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/nobels/resumes/ernest-hemingway-resume.txt', /* required */
                    Replace: true || false
                },
                /* more items */
            ],
        },
        {
            Name: 'FREDERICK-SANGER', /* required */ 
            Attributes: [ /* required */
                {
                    Name: 'FULL_NAME', /* required */
                    Value: 'Frederick Sanger', /* required */
                    Replace: true || false
                },
                {
                    Name: 'YEAR_WON_NOBEL', /* required */
                    Value: '1958, 1980', /* required */
                    Replace: true || false
                },
                {
                    Name: 'NOBEL_FIELD', /* required */
                    Value: 'Chemistry', /* required */
                    Replace: true || false
                },
                {
                    Name: 'PICTURE_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/nobels/images/frederick-sanger.jpg', /* required */
                    Replace: true || false
                },
                {
                    Name: 'RESUME_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/nobels/resumes/frederick-sanger-resume.txt', /* required */
                    Replace: true || false
                },
                /* more items */
            ],
        },
        {
            Name: 'MAX-BORN', /* required */ 
            Attributes: [ /* required */
                {
                    Name: 'FULL_NAME', /* required */
                    Value: 'Max Born', /* required */
                    Replace: true || false
                },
                {
                    Name: 'YEAR_WON_NOBEL', /* required */
                    Value: '1954', /* required */
                    Replace: true || false
                },
                {
                    Name: 'NOBEL_FIELD', /* required */
                    Value: 'Physics', /* required */
                    Replace: true || false
                },
                {
                    Name: 'PICTURE_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/nobels/images/max-born.jpg', /* required */
                    Replace: true || false
                },
                {
                    Name: 'RESUME_URL', /* required */
                    Value: 'https://s3.amazonaws.com/stephen.karger-people/nobels/resumes/max-born-resume.txt', /* required */
                    Replace: true || false
                },
                /* more items */
            ],
        }
        ]
    };

    simpledb.batchPutAttributes(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
            getStars();
            getNobels();
            updateLater();
            deleteLater();
        }
    });
};

function printPerson(err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        console.log(data);           // successful response

        if (!data['Attributes']) {
            demoComplete = true;
        }
    }
};

function getStars() {
    console.log("getStars...");
    function paramsFor(itemName) {
        return {
            DomainName: 'PEOPLE', /* required */
            ItemName: itemName, /* required */
            ConsistentRead: true || false
        };
    };

    simpledb.getAttributes(paramsFor('EDWARD-NORTON'), printPerson);
    simpledb.getAttributes(paramsFor('JESSICA-CHASTAIN'), printPerson);
    simpledb.getAttributes(paramsFor('ANNA-KENDRICK'), printPerson);
};

function getNobels() {
    console.log("getNobels...");
    function paramsFor(itemName) {
        return {
            DomainName: 'PEOPLE', /* required */
            ItemName: itemName, /* required */
            ConsistentRead: true || false
        };
    };

    simpledb.getAttributes(paramsFor('ERNEST-HEMINGWAY'), printPerson);
    simpledb.getAttributes(paramsFor('FREDERICK-SANGER'), printPerson);
    simpledb.getAttributes(paramsFor('MAX-BORN'), printPerson);
};

function deleteLater() {
    setTimeout(function() {
        deletePerson('ANNA-KENDRICK');
    }, 2000);
};

function deletePerson(itemName) {
    var params = {
        DomainName: 'PEOPLE',
        Items: [
            {
                Name: itemName
            }
        ]
    };

    simpledb.batchDeleteAttributes(params, function(err, data) {
        console.log("deletePerson (" + itemName + ")...");
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);           // successful response
            getStars();
        }
    });
};

function updateLater() {
    setTimeout(function() {
        updateYear('ERNEST-HEMINGWAY'); 
    }, 1000);
};

function updateYear(itemName) {
    var params = {
        DomainName: 'PEOPLE',
        ItemName: itemName,
        Attributes: [
            {
                Name: 'YEAR_WON_NOBEL',
                Value: '2100',
                Replace: true
            }
        ]
    };

    simpledb.putAttributes(params, function(err, data) {
        console.log("updateYear (" + itemName + ")...");
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);           // successful response
            getNobels();
        }
    });
}

function deletePeople() {
    if (demoComplete) {
        console.log("deletePeople...");
        var params = {
            DomainName: 'PEOPLE' /* required */
        };
        simpledb.deleteDomain(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
        return;
    } else {
        setTimeout(deletePeople, 500);
    }
}

(function main() {
    createPeople();
    deletePeople();
})();
