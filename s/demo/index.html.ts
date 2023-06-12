
import {html} from "../html/html.js"
import {template} from "../build/template.js"
import {description, random_value} from "./data.js"
import pagePartialHtml from "./page.partial.html.js"

export default template(async basics => pagePartialHtml(basics, html`
	<p>${description}</p>
	<p>${random_value}</p>
`))

