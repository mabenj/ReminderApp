import React from "react";
import Reminders from "./Reminders";
import AddReminderForm from "./AddReminderForm";
import reminderService from "../services/reminderService";
import formatDateTime from "../utils/timeUtils"

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reminders: [],
			newName: "",
			newDateTime: { date: "", time: "" }
		};
	}

	componentDidMount() {
		// Get and set initial reminders
		reminderService.getAllReminders().then((reminders) => {
			this.setState({ reminders });
		});
	}

	addReminder = (e) => {
		e.preventDefault();
		if (this.state.reminders.some((reminder) => reminder.name === this.state.newName)) {
			alert("Tää on olemassa jo!");
			return;
		}
		// Post to server
		reminderService
			.createReminder(this.state.newName, formatDateTime(this.state.newDateTime))
			.then((newReminder) => {
				// Update state
				this.setState((prevState) => ({
					reminders: [...prevState.reminders, newReminder],
					newName: "",
					newDateTime: { date: "", time: "" }
				}));
				console.log(`Reminder with id: ${newReminder.id} successfully created`);
			})
			.catch((reason) => {
				console.log(`Could not create a reminder: ${reason}`);
			});
	};

	onReminderDelete = (id) => {
		if (window.confirm("Ootko ihan varma?")) {
			// Delete from server
			reminderService.deleteReminderById(id).then((wasSuccess) => {
				if (wasSuccess) {
					// Delete from state
					this.setState((prevState) => ({
						reminders: prevState.reminders.filter((reminder) => reminder.id !== id)
					}));
					console.log(`Reminder with id: ${id} successfully deleted`);
				} else {
					console.log(`Reminder with id: ${id} could not be deleted`);
				}
			});
		}
	};

	render() {
		return (
			<div className="container">
				<h2>Lisää muistutus</h2>
				<AddReminderForm
					submitHandler={this.addReminder}
					setName={(name) => this.setState({ newName: name })}
					setDateTime={(dateTime) => this.setState({ newDateTime: dateTime })}
					nameValue={this.state.newName}
					dateTimeValue={this.state.newDateTime}
				/>
				<h2>Muistutukset</h2>
				<Reminders reminders={this.state.reminders} deletionHandler={this.onReminderDelete} />
			</div>
		);
	}
}

export default App;
