function logRecords(shardIterator) {
  console.log("logRecords");

  var params = {
    ShardIterator: shardIterator, /* required */
    Limit: 100
  };
  kinesis.getRecords(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      // successful response
      data.Records.forEach(reportLocation);
      var nextLogRecords = logRecords.bind(undefined, data.NextShardIterator);
      setTimeout(nextLogRecords, 3000);
    }
  });
}

function reportLocation(locationElement, index, array) {
  locationObject = JSON.parse(
    Utils.Uint8ToString(locationElement.Data)
  );
  console.log(locationObject);
  appendLatestRow(locationObject);
}

function appendLatestRow(locationObject) {
  var tableRef = document.getElementById('locationTable').getElementsByTagName('tbody')[0];
  var newRow = tableRef.insertRow(0);
  newRow.id = locationObject.id;
  insertBasicLocationData(locationObject, newRow);
}

function insertBasicLocationData(locationObject, tableRow) {
  var timeCell = tableRow.insertCell(0);
  var latCell = tableRow.insertCell(1);
  var lngCell = tableRow.insertCell(2);

  var timeString = formatTime(locationObject.submissionTime);
  var timeText = document.createTextNode(timeString);
  timeCell.appendChild(timeText);

  var latText = document.createTextNode(
    formatCoordinate(locationObject.latitude)
  );
  latCell.appendChild(latText);

  var lngText = document.createTextNode(
    formatCoordinate(locationObject.longitude)
  );
  lngCell.appendChild(lngText);
}

function formatTime(epochTime) {
  dateTime = new Date(epochTime);
  return pad(dateTime.getHours()) + ":" +
    pad(dateTime.getMinutes()) + ":" +
    pad(dateTime.getSeconds());
}

function pad(n) {
      return (n < 10) ? ("0" + n) : n;
}

function formatCoordinate(coordinate) {
  return parseFloat(coordinate).toFixed(3)
}
