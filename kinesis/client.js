// create Kinesis client
function setupClient() {
  // Credentials:
  // Create credentials.js file.
  // In it, create a JSON object with AWS credentials as follows:
  // var localCredentials = {
  //   "akid": "<access key id>",
  //   "secret": "<secret access key>",
  //   "googleMapsKey": "<google maps api key>"
  // }
  // The credentials should identify an IAM user that has access to kinesis

  var region = 'us-east-1';
  var stream = 'MyFirstStream';

  var AWS = window.AWS;
  AWS.config.update({accessKeyId: localCredentials.akid, secretAccessKey: localCredentials.secret});
  AWS.config.region = region;

  return (new AWS.Kinesis());
}
