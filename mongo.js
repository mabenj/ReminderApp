const { Reminder, closeConnection } = require("./models/reminder");

const [, , name, timestamp] = process.argv;

if (name && timestamp) {
	const timestampDate = new Date(timestamp);
	const reminder = new Reminder({
		name: name,
		timestamp: timestampDate
	});
	console.log(`adding reminder ${name} at ${timestampDate.toISOString()} to the reminder database`);
	reminder
		.save()
		.then(() => closeConnection())
		.catch(console.log);
} else {
	Reminder.find({})
		.then((result) => {
			console.log("Reminders:");
			result.forEach((reminder) => {
				console.log(`${reminder.name}, ${new Date(reminder.timestamp).toISOString()}`);
			});
			closeConnection();
		})
		.catch(console.log);
}
