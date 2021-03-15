import React from "react";
import Reminders from "./Reminders";
import AddReminderForm from "./AddReminderForm";
import reminderService from "../services/reminderService";
import formatDateTime from "../utils/timeUtils";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reminders: []
		};
	}

	componentDidMount() {
		// Get and set initial reminders
		reminderService
			.getAllReminders()
			.then((reminders) => {
				this.setState({ reminders });
			})
			.catch((error) => {
				console.error("Could not fetch reminders from database", error);
			});
	}

	onAddReminder = async (reminderName, reminderDateTime) => {
		if (this.state.reminders.some((reminder) => reminder.name === reminderName)) {
			alert("Muistutus on jo olemassa!");
			return Promise.reject("Duplicate reminder");
		}
		// Post to server
		reminderService
			.createReminder(reminderName, formatDateTime(reminderDateTime))
			.then((newReminder) => {
				// Update state
				this.setState((prevState) => ({
					reminders: [...prevState.reminders, newReminder]
				}));
				console.log(`Reminder with id: ${newReminder.id} successfully created`);
				return Promise.resolve();
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	onReminderDelete = (id) => {
		if (window.confirm("Haluatko varmasti poistaa muistutuksen?")) {
			// Delete from server
			reminderService.deleteReminderById(id).then((wasSuccess) => {
				if (wasSuccess) {
					// Delete from state
					this.setState((prevState) => ({
						reminders: prevState.reminders.filter((reminder) => reminder.id !== id)
					}));
					console.log(`Reminder with id: ${id} successfully deleted`);
				} else {
					console.error(`Reminder with id: ${id} could not be deleted`);
				}
			});
		}
	};

	render() {
		return (
			<div className="container">
				<h2>Lisää muistutus</h2>
				<AddReminderForm addReminderHandler={this.onAddReminder} />
				<h2>Muistutukset</h2>
				<Reminders reminders={this.state.reminders} deletionHandler={this.onReminderDelete} />
			</div>
		);
	}
}

export default App;
