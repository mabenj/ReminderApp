import React, { useState } from "react";

export default function AddReminderForm({ addReminderHandler }) {
	const [reminderName, setReminderName] = useState("");
	const [dateTime, setDateTime] = useState({ date: "", time: "" });

	const onDateChange = (e) => {
		setDateTime((prevState) => ({ date: e.target.value, time: prevState.time }));
	};

	const onTimeChange = (e) => {
		setDateTime((prevState) => ({ date: prevState.date, time: e.target.value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addReminderHandler(reminderName, dateTime)
			.then(() => {
				setReminderName("");
				setDateTime({ date: "", time: "" });
			})
			.catch((error) => {
				console.error(`Could not create reminder: ${error}`);
			});
	};

	return (
		<form onSubmit={onSubmit}>
			<table>
				<tbody>
					<tr>
						<td>
							<label htmlFor="reminder-name">Aihe</label>
						</td>
						<td>
							<input
								id="reminder-name"
								value={reminderName}
								onChange={(e) => setReminderName(e.target.value)}
								placeholder="Osta makkaraa..."
								required
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor="reminder-date">Päivämäärä</label> ja <label htmlFor="reminder-time">aika</label>
						</td>
						<td>
							<input
								id="reminder-date"
								value={dateTime.date}
								onChange={onDateChange}
								type="date"
								style={{ marginRight: "20px" }}
								pattern="\d{4}-\d{2}-\d{2}"
							/>
							<input
								id="reminder-time"
								value={dateTime.time}
								onChange={onTimeChange}
								type="time"
								pattern="[0-9]{2}:[0-9]{2}"
							/>
						</td>
					</tr>
					<tr>
						<td>
							<button className="add-btn" type="submit">
								Lisää
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	);
}
