const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
const CLUSTER_ADDRESS = process.env.MONGO_CLUSTER_ADDRESS;
const DB_NAME = process.env.MONGO_DB_NAME;

const CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER_ADDRESS}/${DB_NAME}`;
mongoose
	.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch((error) => console.log(error));

const Reminder = mongoose.model("Reminder", {
	name: String,
	timestamp: Date
});

const closeConnection = () => {
	return mongoose.connection.close();
};

module.exports = { Reminder, closeConnection };
