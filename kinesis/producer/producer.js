var Producer = {
  submitLocation: function(kinesisClient, latitude, longitude) {
    var location = {
      "id": Utils.uuid(),
      "latitude": latitude,
      "longitude": longitude,
      "submissionTime": Date.now()
    };

    var params = {
      Records: [ /* required */
        {
          Data: JSON.stringify(location),
          PartitionKey: 'pk1', /* required */
        },
        /* more items */
      ],
      StreamName: 'MyFirstStream' /* required */
    };

    kinesisClient.putRecords(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
};
