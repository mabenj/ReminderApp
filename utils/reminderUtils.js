const validateReminder = (data) => {
	if (!data.name) {
		return {
			status: 400,
			reason: "reminder name missing"
		};
	}
	if (!data.timestamp) {
		return {
			status: 400,
			reason: "reminder timestamp missing"
		};
	}
	if (isNaN(Date.parse(data.timestamp))) {
		return {
			status: 400,
			reason: "invalid timestamp"
		};
	}
	return null;
};

const formatReminder = (reminder) => {
	return {
		name: reminder.name,
		timestamp: reminder.timestamp,
		id: reminder._id
	};
};

module.exports = { validateReminder, formatReminder };
