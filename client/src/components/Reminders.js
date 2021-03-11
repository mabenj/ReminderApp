import React from "react";
import Reminder from "./Reminder";

export default function Reminders({ reminders, deletionHandler }) {
	const content =
		reminders.length < 1 ? (
			<tr>
				<td>
					<em>Ei muistutuksia</em>
				</td>
			</tr>
		) : (
			reminders
				.sort((a, b) => {
					return new Date(a.timestamp) - new Date(b.timestamp);
				})
				.map((reminder) => <Reminder key={reminder.id} reminder={reminder} deletionHandler={deletionHandler} />)
		);
	return (
		<table>
			<tbody>{content}</tbody>
		</table>
	);
}
