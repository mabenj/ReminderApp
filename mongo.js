const { Reminder, closeConnection } = require("./models/reminder");

const [, , name, timestamp] = process.argv;

if (name && timestamp) {
	const timestampDate = new Date(timestamp);
	const reminder = new Reminder({
		name: name,
		timestamp: timestampDate
	});
	console.log(`adding Reminder ${name} at ${timestampDate.toISOString()} to the reminder database`);
	reminder
		.save()
		.then(() => closeConnection())
		.catch((error) => console.log(error));
} else {
	console.log("Reminders:");
	Reminder.find({})
		.then((result) => {
			result.forEach((reminder) => {
				console.log(`${reminder.name}, ${new Date(reminder.timestamp).toISOString()}`);
			});
			closeConnection();
		})
		.catch((error) => console.log(error));
}
