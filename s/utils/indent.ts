
import {repeat_string} from "./repeat_string.js"

export function indent(indenter: string, n: number, text: string) {
	return text
		.split("\n")
		.map(
			line => line.length > 0
				? repeat_string(n, indenter) + line
				: line
		)
		.join("\n")
}

