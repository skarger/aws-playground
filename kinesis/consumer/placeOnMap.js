function placeOnMap(shardIterator) {
  console.log("placeOnMap");

  var params = {
    ShardIterator: shardIterator, /* required */
    Limit: 100
  };
  kinesis.getRecords(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      // successful response
      data.Records.forEach(createMarker);
      var nextPlaceOnMap = placeOnMap.bind(undefined, data.NextShardIterator);
      setTimeout(nextPlaceOnMap, 3000);
    }
  });
}

function createMarker(locationElement, index, array) {
  locationObject = JSON.parse(
    Utils.Uint8ToString(locationElement.Data)
  );
  var marker = new google.maps.Marker({
    position: {
      lat: locationObject.latitude,
      lng: locationObject.longitude
    },
    map: map
  });
}
