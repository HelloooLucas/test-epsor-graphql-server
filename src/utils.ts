import * as Kafka from 'node-rdkafka';
import CreateBookInput from './CreateBookInput';

export const sendKafkaMessage = function(message: CreateBookInput) {
	const stringifiedMessage = JSON.stringify(message);

	const producer = new Kafka.Producer({
		'metadata.broker.list': 'localhost:9092',
		'dr_cb': true,
	});

	producer.connect();
	producer.on('ready', function() {
		try {
			producer.produce(
				'quickstart-events',
				null,
				Buffer.from(stringifiedMessage),
			);
		}
		catch (err) {
			console.error('A problem occurred when sending our message');
			console.error(err);
		}
	});

	producer.setPollInterval(100);
	producer.on('delivery-report', function(err, report) {

		// This is where I acknowledge that the Kafka broker received my message
		console.log('DELIVERY REPORT ', report);
		producer.disconnect();
	})
};
