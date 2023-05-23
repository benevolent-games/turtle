
import {color} from "@benev/argv"

import {Path} from "./path.js"
import {indent} from "./indent.js"

export function log_error(error: any, activity?: string, path?: string) {

	if (error instanceof Error)
		console.error(error_message(error, activity, path))

	else
		console.error("ERROR!!", color.red(error))

	process.exit(1)
}

function error_message(error: Error, activity?: string, path?: string) {
	const lines = []

	lines.push(color.red(error.name))

	{
		let origin = ""

		if (activity)
			origin += color.blue(activity) + " "

		if (path)
			origin += color.magenta(path)

		if (origin.length)
			lines.push(indent("  ", 1, origin))
	}

	lines.push(indent("  ", 1, color.yellow(error.message)))
	return lines.join("\n")
}

