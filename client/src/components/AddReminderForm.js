import React from "react";

export default function AddReminderForm({ submitHandler, setName, setDateTime, nameValue, dateTimeValue }) {
	const onDateChange = (e) => {
		setDateTime({ date: e.target.value, time: dateTimeValue.time });
	};

	const onTimeChange = (e) => {
		setDateTime({ date: dateTimeValue.date, time: e.target.value });
	};

	return (
		<form onSubmit={submitHandler}>
			<table>
				<tbody>
					<tr>
						<td>
							<label htmlFor="reminder-name">Aihe</label>
						</td>
						<td>
							<input
								id="reminder-name"
								value={nameValue}
								onChange={(e) => setName(e.target.value)}
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
								value={dateTimeValue.date}
								onChange={onDateChange}
								type="date"
								style={{ marginRight: "20px" }}
								pattern="\d{4}-\d{2}-\d{2}"
							/>
							<input
								id="reminder-time"
								value={dateTimeValue.time}
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
