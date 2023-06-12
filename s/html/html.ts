
import {Html} from "./template.js"

export function html(
		strings: TemplateStringsArray,
		...values: any[]
	): Html {

	return new Html({strings, values})
}

