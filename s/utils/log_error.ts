
import {color} from "@benev/argv"
import {indent} from "./indent.js"

export function log_error(error: any, activity?: string, path?: string) {
	if (error instanceof Error)
		console.error(error_message(error, activity, path))
	else
		console.error("ERROR!!", color.red(error))
}

function error_message(error: Error, activity?: string, path?: string) {
	const lines = []

	lines.push(color.red(error.name) + " " + color.yellow(error.message))

	{
		let origin = ""

		if (activity)
			origin += color.magenta("while " + activity) + " "

		if (path)
			origin += color.cyan(path)

		if (origin.length)
			lines.push(indent("  ", 1, origin))
	}

	if (error.stack)
		lines.push(
			...error.stack
				.split("\n")
				.slice(1)
				.map(line => line.trim())
				.map(line => color.red(line))
				.map(line => indent("  ", 1, line.trim()))
		)

	return lines.join("\n")
}

