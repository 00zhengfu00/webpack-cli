const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

// Only show emoji on OSx (Windows shell doesn't like them that much ¯\_(ツ)_/¯ )
function emoji(emoji) {
	if (process.stdout.isTTY && process.platform === "darwin") {
		return emoji;
	} else {
		return "";
	}
}

function print(str = "", color = "dim") {
	const terminalCols = 80;
	// eslint-disable-next-line no-control-regex
	const ansiEscapeSeq = /\u001b\[[0-9]{1,2}m/g;
	const strLength = str.replace(ansiEscapeSeq, "").length;
	const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
	const leftPadding = " ".repeat(leftPaddingLength);
	str = chalk[color](str);
	console.log(leftPadding, str);
}

function printBadge() {
	console.log("\n");
	print(`${chalk.bold("Thanks for using")} ${chalk.bold.blue("Webpack!")}`);
	print(`Please consider donating to our ${chalk.bold.blue("Open Collective")}`);
	print("to help us maintain this package.");
	console.log("\n\n");
	print(`${emoji("👉")} ${chalk.bold.yellow(" Donate:")} ${chalk.reset.underline.yellow("https://opencollective.com/webpack/donate")}`);
	console.log("\n");
}


const now = new Date();
const MONDAY = 1;
if (now.getDay() === MONDAY) {
	const lastPrintFile = path.resolve(__dirname, "../.lastocprint");
	fs.readFile(lastPrintFile, "utf8", (err, lastPrint = 0) => {
		if (err && err.code !== "ENOENT") return;
		if (now - lastPrint > 6 * 24 * 60 * 60 * 1000) {
			printBadge();
			fs.writeFileSync(lastPrintFile, now);
		}
	});
}
