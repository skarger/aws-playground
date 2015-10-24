require 'aws-sdk'
require 'json'

# export AWS_SECRET_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION to environment

# helper methods
def create_my_queue(sqs)
  sqs.create_queue({
    queue_name: "MyQueue",
    attributes: {
      "VisibilityTimeout" => "20"
    }
  })
end

def my_queue_exists?(sqs)
  sqs.list_queues.queue_urls.include?(my_queue_url)
end

def print_my_queue_attributes(sqs, my_queue_url)
  puts sqs.get_queue_attributes({
    queue_url: my_queue_url,
    attribute_names: ["All"]
  }).attributes
end

def send_message_to_my_queue(sqs, body, my_queue_url)
  sqs.send_message({
    queue_url: my_queue_url,
    message_body: body
  })
end

def receive_message_from_my_queue(sqs, my_queue_url)
  sqs.receive_message({
    queue_url: my_queue_url,
    message_attribute_names: ["All"],
    max_number_of_messages: 1,
    wait_time_seconds: 1
  })
end

def delete_message_from_my_queue(sqs, message, my_queue_url)
  sqs.delete_message({
    queue_url: my_queue_url,
    receipt_handle: message.receipt_handle
  })
end

def insert_and_delete_one_message(sqs, my_queue_url)
  sent = send_message_to_my_queue(sqs, "Message Body 1", my_queue_url)
  puts "sent: #{sent.message_id}"

  received = receive_message_from_my_queue(sqs, my_queue_url)

  if received
    puts "received: #{received.messages[0].message_id}"
    puts received.messages[0].body
    deleted = delete_message_from_my_queue(sqs, received.messages[0], my_queue_url)
    print_my_queue_attributes(sqs, my_queue_url)
  end
end

def wait_to_demonstrate_revisibility(sqs, my_queue_url)
  puts "start:"
  print_my_queue_attributes(sqs, my_queue_url)

  sent = send_message_to_my_queue(sqs, "Message Body 2", my_queue_url)
  puts "sent: #{sent.message_id}"

  puts "receiving.. "
  received1 = receive_message_from_my_queue(sqs, my_queue_url)

  if received1
    puts "received1: #{received1.messages[0].message_id}"
    puts received1.messages[0].body

    sleep_5_seconds_and_check(sqs, my_queue_url)

    sleep_20_seconds_and_check(sqs, my_queue_url)
  end
end

def sleep_5_seconds_and_check(sqs, my_queue_url)
  puts "sleeping 5 seconds"
  sleep 5
  
  puts sqs.get_queue_attributes({
    queue_url: my_queue_url,
    attribute_names: ["ApproximateNumberOfMessages", "ApproximateNumberOfMessagesNotVisible"]
  }).attributes
  received2 = receive_message_from_my_queue(sqs, my_queue_url)

  puts "receiving again... message should not be visible yet"
  if !received2.messages.empty?
    puts "received2: #{received2.messages[0].message_id}"
    puts received2.messages[0].body
  else
    puts "not received"
  end
end

def sleep_20_seconds_and_check(sqs, my_queue_url)
  puts "sleeping 20 more seconds - message should become visible after"
  sleep 20
  puts sqs.get_queue_attributes({
    queue_url: my_queue_url,
    attribute_names: ["ApproximateNumberOfMessages", "ApproximateNumberOfMessagesNotVisible"]
  }).attributes

  puts "receiving again..."
  received3 = receive_message_from_my_queue(sqs, my_queue_url)

  if received3
    puts "received3: #{received3.messages[0].message_id}"
    puts received3.messages[0].body
    puts "deleting..."
    deleted = delete_message_from_my_queue(sqs, received3.messages[0], my_queue_url)
  end
end

def insert_messages_and_show_approx_count(sqs, my_queue_url)
  puts "inserting five messages"
  send_message_to_my_queue(sqs, "Message Body 3", my_queue_url)
  send_message_to_my_queue(sqs, "Message Body 4", my_queue_url)
  send_message_to_my_queue(sqs, "Message Body 5", my_queue_url)
  send_message_to_my_queue(sqs, "Message Body 6", my_queue_url)
  send_message_to_my_queue(sqs, "Message Body 7", my_queue_url)
  puts "fetching queue attributes"
  print_my_queue_attributes(sqs, my_queue_url)
end

def delete_my_queue(sqs, my_queue_url)
  puts "deleting queue #{my_queue_url}"
  sqs.delete_queue({
    queue_url: my_queue_url
  })
end

# main
sqs = Aws::SQS::Client.new()
created = create_my_queue(sqs)
my_queue_url = created.queue_url 
puts "created queue #{my_queue_url}"
print_my_queue_attributes(sqs, my_queue_url)
insert_and_delete_one_message(sqs, my_queue_url) 
wait_to_demonstrate_revisibility(sqs, my_queue_url)
insert_messages_and_show_approx_count(sqs, my_queue_url)
delete_my_queue(sqs, my_queue_url)

