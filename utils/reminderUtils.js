const { Reminder } = require("../models/reminder");

const validateReminder = async (data) => {
	if (!data.name) {
		return Promise.reject({
			status: 400,
			reason: "reminder name missing"
		});
	}
	if (!data.timestamp) {
		return Promise.reject({
			status: 400,
			reason: "reminder timestamp missing"
		});
	}
	if (isNaN(Date.parse(data.timestamp))) {
		return Promise.reject({
			status: 400,
			reason: "invalid timestamp"
		});
	}
	if (await nameExists(data.name)) {
		return Promise.reject({
			status: 400,
			reason: "name must be unique"
		});
	}
	return Promise.resolve({ name: data.name, timestamp: data.timestamp });
};

const nameExists = async (name) => {
	try {
		const result = await Reminder.find({ name }).exec();
		return result.length > 0;
	} catch (error) {
		console.log(error);
	}
};

const formatReminder = (reminder) => {
	return {
		name: reminder.name,
		timestamp: reminder.timestamp,
		id: reminder._id
	};
};

module.exports = { validateReminder, formatReminder };
