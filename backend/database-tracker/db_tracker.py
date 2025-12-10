from confluent_kafka import Consumer, KafkaError

def process_message(msg):
    # Deserialize message value (assuming it's JSON formatted)
    import json
    try:
        data = json.loads(msg.value().decode('utf-8'))
        status = data.get('status', '')

        # TODO: Update the status of the model status from PROCESSING to COMPLETED
        # This is where you'd typically interface with your database, using an ORM or a direct DB connection.
        # You'd query the model record by its ID or some unique identifier and update its status.
        
    except json.JSONDecodeError:
        print("Failed to decode message value as JSON.")

def main():
    conf = {
        'bootstrap.servers': 'YOUR_KAFKA_BROKER',   # Replace with your Kafka broker address
        'group.id': 'your_group_id',                 # Consumer group ID for load balancing
        'auto.offset.reset': 'earliest'              # Start reading from the beginning of the topic
    }

    # Create a Kafka consumer instance with provided configurations
    consumer = Consumer(conf)

    # Subscribe to the 'train_model_output' topic
    consumer.subscribe(['train_model_output'])

    while True:
        msg = consumer.poll(1.0)  # Poll for a message (with a timeout of 1.0 seconds)

        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                print('Reached end of topic: {0} at offset: {1}'.format(msg.topic(), msg.offset()))
            else:
                print('Error while consuming message: {0}'.format(msg.error()))
        else:
            process_message(msg)

    consumer.close()

if __name__ == '__main__':
    main()
