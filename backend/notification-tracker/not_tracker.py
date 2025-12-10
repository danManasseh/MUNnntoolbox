from confluent_kafka import Consumer, KafkaError
import smtplib
from email.mime.text import MIMEText

def send_email(receiver_email, full_name, status):
    """Function to send an email."""

    message = f"Hello {full_name},\n\nYour model training has {status}.\n\nRegards,\n MUNnntoolbox"
    msg = MIMEText(message)
    msg['Subject'] = "Model Training Status"
    msg['From'] = "your_email@example.com"
    msg['To'] = receiver_email
    
    with smtplib.SMTP('smtp.example.com') as server:
        server.login("your_email@example.com", "your_password")
        server.sendmail("your_email@example.com", receiver_email, msg.as_string())

def listen_and_notify():

    conf = {
        'bootstrap.servers': 'localhost:9092', 
        'group.id': 'email_group',
        'auto.offset.reset': 'earliest'
    }

    consumer = Consumer(conf)
    consumer.subscribe(['train_model_output'])

    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue
        if msg.error():
            print("Error during consumption: {}".format(msg.error()))
        else:
            message_content = msg.value().decode('utf-8')
            message_dict = json.loads(message_content)
            
            receiver_email = message_dict.get('email')
            full_name = message_dict.get('full_name')
            status = message_dict.get('status')
            
            send_email(receiver_email, full_name, status)

    


if __name__ == '__main__':
    listen_and_notify()