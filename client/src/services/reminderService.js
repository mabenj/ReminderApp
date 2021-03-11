import axios from "axios";

const REMINDERS_API_URL = "/api/reminders";

const getAllReminders = () => {
	return axios.get(REMINDERS_API_URL).then((response) => {
		return response.data;
	});
};

const createReminder = (name, date) => {
	const reminderData = {
		name: name,
		timestamp: date.toISOString()
	};
	return axios.post(REMINDERS_API_URL, reminderData).then((response) => {
		return response.data;
	});
};

const deleteReminderById = (id) => {
	return axios
		.delete(`${REMINDERS_API_URL}/${id}`)
		.then((response) => {
			return response.status === 200 || response.status === 204;
		})
		.catch(() => {
			return false;
		});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllReminders, createReminder, deleteReminderById };
