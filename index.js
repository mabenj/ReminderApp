const express = require("express");
const cors = require("cors");
const parser = require("body-parser");

const app = express();
app.use(express.static("./client/build"));
app.use(cors());
app.use(parser.json());

const { Reminder } = require("./models/reminder");
const { validateReminder, formatReminder } = require("./utils/reminderUtils");

app.get("/", (_, response) => {
	response.send("Try <code>/api/reminders</code>");
});

app.get("/api/reminders", (_request, response) => {
	Reminder.find({})
		.then((reminders) => {
			response.json(reminders.map(formatReminder));
		})
		.catch((error) => {
			console.log(error);
			response.status(500).json({ error: "could not fetch reminders" });
		});
});

app.get("/api/reminders/:id", (request, response) => {
	Reminder.findById(request.params.id)
		.then((reminder) => {
			if (reminder) {
				response.json(formatReminder(reminder));
			} else {
				response.status(404).end();
			}
		})
		.catch(() => {
			response.status(400).json({ error: "malformed id" });
		});
});

app.delete("/api/reminders/:id", (request, response) => {
	Reminder.findByIdAndRemove(request.params.id, { useFindAndModify: false })
		.then((result) => {
			response.status(result ? 204 : 404).end();
		})
		.catch(() => {
			response.status(400).json({ error: "malformed id" });
		});
});

app.post("/api/reminders", (request, response) => {
	validateReminder(request.body)
		.then(({ name, timestamp }) => {
			const newReminder = new Reminder({ name, timestamp: new Date(timestamp) });
			newReminder
				.save()
				.then(formatReminder)
				.then((newReminder) => response.status(201).json(newReminder))
				.catch((error) => {
					console.log(error);
					response.status(500).json({ error: "could not create a new reminder" });
				});
		})
		.catch((error) => {
			return response.status(error.status).json({ error: error.reason });
		});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
