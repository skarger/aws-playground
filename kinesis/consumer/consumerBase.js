var ConsumerBase = {
  getShard: function(successFunction) {
    console.log("getShard");
    var params = {
      StreamName: 'MyFirstStream', /* required */
      Limit: 1
    };
    kinesis.describeStream(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        shard = data.StreamDescription.Shards[0];
        successFunction(shard);
      }
    });
  },
  getFirstIterator: function(successFunction, shard) {
    console.log("getFirstIterator");
    console.log(shard.ShardId);
    var params = {
      ShardId: shard.ShardId, /* required */
      ShardIteratorType: 'LATEST', /* required */
      StreamName: 'MyFirstStream', /* required */
    };
    kinesis.getShardIterator(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
         successFunction(data.ShardIterator);           // successful response
      }
    });
  },
  streamData: function(recordProcessor) {
    var processShard = ConsumerBase.getFirstIterator.bind(undefined, recordProcessor);
    ConsumerBase.getShard(processShard);
  }
};
