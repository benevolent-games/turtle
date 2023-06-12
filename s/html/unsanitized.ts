
import {Html} from "./template.js"

export function unsanitized(value: string) {
	return new Html({strings: [value], values: []})
}

