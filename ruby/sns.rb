require 'aws-sdk'
require 'json'
require 'pry'

# export AWS_SECRET_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION to environment
# export AWS_SNS_EMAIL, AWS_SNS_SMS to environment


class SNSDemo
  def initialize
    @sns = Aws::SNS::Client.new()
    @new_topic = nil
  end

  attr_reader :new_topic

  def client
    @sns
  end

  def create_new_topic
    @new_topic ||= client.create_topic({
        name: "NewTopic", # required
    })
  end

  def set_new_topic_display_name
    client.set_topic_attributes({
      topic_arn: new_topic.topic_arn,
      attribute_name: "DisplayName",
      attribute_value: "New Topic"
    })
  end

  def list_all_topics
    resp = client.list_topics({ })
  end

  def subscribe_email(email_address)
    resp = client.subscribe({
      topic_arn: new_topic.topic_arn, # required
      protocol: "email", # required
      endpoint: email_address
    })
  end

  def subscribe_sms(sms_number)
    resp = client.subscribe({
      topic_arn: new_topic.topic_arn, # required
      protocol: "sms", # required
      endpoint: sms_number
    })
  end

  def publish_to_new_topic
    resp = client.publish({
      topic_arn: new_topic.topic_arn,
      message: "How's it going?", # required
      subject: "Important New Topic",
      message_structure: "messageStructure"
    })
  end

  def list_new_topic_subscriptions
    resp = client.list_subscriptions_by_topic({
      topic_arn: new_topic.topic_arn
    })
    resp.subscriptions.each do |subscription|
      puts "Subscription ARN: #{subscription.subscription_arn}"
      puts "Subscription protocol: #{subscription.protocol}"
    end
  end
end

demo = SNSDemo.new

puts "Creating New Topic"
if !demo.new_topic
  demo.create_new_topic
  demo.set_new_topic_display_name
end

puts "New Topic ARN: #{demo.new_topic.topic_arn}"

puts "Subscribing an email and SMS endpoint to New Topic"
demo.subscribe_email(ENV['AWS_SNS_EMAIL'])
demo.subscribe_sms(ENV['AWS_SNS_SMS'])

puts "Publishing message to New Topic"
demo.publish_to_new_topic

puts "Listing topic subscriptions"
demo.list_new_topic_subscriptions

