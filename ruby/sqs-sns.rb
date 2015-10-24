require 'aws-sdk'
require 'json'

# export AWS_SECRET_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION to environment

class SubscribeSQSToSNSDemo
  def initialize
    @sqs = Aws::SQS::Client.new()
    @sns = Aws::SNS::Client.new()
    @hot_topic = nil
    @simple_queue = nil
    @simple_queue_arn = nil
    @subscription_arn = nil
  end

  attr_reader :sqs, :sns

  def obtain_sqs
    @simple_queue ||= sqs.list_queues({
      queue_name_prefix: "SimpleQueue"
    }).queue_urls.first
  end

  def simple_queue_arn
    @simple_queue_arn ||= sqs.get_queue_attributes({
      queue_url: @simple_queue, # required
      attribute_names: ["QueueArn"]
    }).attributes["QueueArn"]
  end

  def obtain_sns
    @hot_topic ||= sns.list_topics({ }).topics.select do |topic|
      topic.topic_arn.include?("HotTopic")
    end.first
  end

  def subscribe_sqs_from_sns
    puts "Subscribing SQS from SNS"
    resp = sns.subscribe({
      topic_arn: @hot_topic.topic_arn, # required
      protocol: "sqs", # required
      endpoint: simple_queue_arn,
    })
    @subscription_arn ||= resp.subscription_arn
  end

  def publish_to_hot_topic
    resp = sns.publish({
      topic_arn: @hot_topic.topic_arn,
      message: "Special Message", # required
      subject: "Read me",
    })
  end

  def receive_message_from_simple_queue
    sqs.receive_message({
      queue_url: @simple_queue,
      message_attribute_names: ["All"],
      max_number_of_messages: 1,
      wait_time_seconds: 1
    }).messages[0]
  end

  def delete_message_from_simple_queue(receipt_handle)
    sqs.delete_message({
      queue_url: @simple_queue,
      receipt_handle: receipt_handle
    })
  end
end

# main
demo = SubscribeSQSToSNSDemo.new
demo.obtain_sqs
demo.obtain_sns
demo.subscribe_sqs_from_sns
demo.publish_to_hot_topic

message = demo.receive_message_from_simple_queue
puts "Received Message:"
puts message.body.to_s
demo.delete_message_from_simple_queue(message.receipt_handle)
