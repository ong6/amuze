export function getShortAccountHash(account) {
	const accountHash = String(account);
	if (accountHash) {
		return (
			accountHash.slice(0, 6) +
			"..." +
			accountHash.slice(-4, accountHash.length)
		);
	} else {
		return "Login";
	}
}

export function abbreviateNumber(number) {
	const SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];

	number = Number(number).toFixed(2);

	const tier = (Math.log10(Math.abs(number)) / 3) | 0;
	if (tier == 0) return number;

	const suffix = SI_SYMBOL[tier];
	const scale = Math.pow(10, tier * 3);
	const scaled = number / scale;

	return scaled.toFixed(2) + suffix;
}

export function changeratio(x) {
	var y = 1.5;
	return x * y;
}

export function toPercent(number, float) {
	var percent = parseFloat(number * 100).toFixed(float) + "%";
	return percent;
}

export function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];
	// var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	// var hour = a.getHours();
	// var min = a.getMinutes();
	// var sec = a.getSeconds();
	// var time =
	//   date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
	var display = date + " " + month;
	return display;
}
