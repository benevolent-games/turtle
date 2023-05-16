
import {HtmlTemplate} from "./template.js"

export function unsanitized(value: string) {
	return new HtmlTemplate({strings: [value], values: []})
}

