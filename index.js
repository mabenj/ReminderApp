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
			response.status(400).json({ error: "bad id" });
		});
});

app.delete("/api/reminders/:id", (request, response) => {
	Reminder.findByIdAndRemove(request.params.id, { useFindAndModify: false })
		.then((result) => {
			if (result) {
				response.status(204).end();
			} else {
				response.status(404).end();
			}
		})
		.catch(() => {
			response.status(400).json({ error: "bad id" });
		});
});

app.post("/api/reminders", (request, response) => {
	const data = request.body;
	const error = validateReminder(data);
	if (error) {
		return response.status(error.status).json({ error: error.reason });
	}
	const newReminder = new Reminder({
		name: data.name,
		timestamp: new Date(data.timestamp)
	});
	newReminder
		.save()
		.then(formatReminder)
		.then((newReminder) => response.json(newReminder))
		.catch((error) => {
			console.log(error);
			response.status(500).json({ error: "could not create a new reminder" });
		});
});

const PORT = process.env.PORT || 3001; // remember to change in client's package.json proxy also!
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
