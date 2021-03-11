import React from "react";

export default function Reminder({ reminder, deletionHandler }) {
	const timestamp = new Date(reminder.timestamp);
	const now = new Date();
    const isExpired = timestamp < now;
	return (
		<tr className={isExpired ? "expired-row" : ""}>
			<td className="timestamp">
				<i>{timestamp.toLocaleString()}</i>
			</td>
			<td className="row-data">
				<p>{reminder.name}</p>
			</td>
			<td>
				<button className="delete-btn" onClick={() => deletionHandler(reminder.id)}>
					Poista
				</button>
			</td>
		</tr>
	);
}
