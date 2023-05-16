
import {HtmlTemplate} from "./template.js"

export function html(
		strings: TemplateStringsArray,
		...values: any[]
	): HtmlTemplate {

	return new HtmlTemplate({strings, values})
}

