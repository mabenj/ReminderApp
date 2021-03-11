const possibleDelimitersRegex = /[:./-]+/;

const formatDateTime = (dateTime) => {
	if (dateTime.date && dateTime.time) {
		return new Date(`${formatISODateString(dateTime.date)}T${formatISOTimeString(dateTime.time)}`);
	}
	if (dateTime.date) {
		return new Date(`${formatISODateString(dateTime.date)}T00:00:00`);
	}
	if (dateTime.time) {
		var result = new Date();
		const [hours, minutes, seconds] = dateTime.time.split(possibleDelimitersRegex);
		result.setHours(hours || 0, minutes || 0, seconds || 0, 0);
		return result;
	}
	return new Date();
};

const formatISODateString = (date) => {
	const [year, month, day] = date.split(possibleDelimitersRegex);
	return `${year}-${month}-${day}`;
};

const formatISOTimeString = (time) => {
	const [hours, minutes, seconds] = time.split(possibleDelimitersRegex);
	return `${hours || "00"}:${minutes || "00"}:${seconds || "00"}`;
};

export default formatDateTime;
