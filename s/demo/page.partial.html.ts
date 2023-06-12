
import {html} from "../html/html.js"
import {Html} from "../html/template.js"
import {template} from "../build/template.js"

const {url} = import.meta

export default template(async({path}, content: Html) => html`
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle</title>
			<link rel="stylesheet" href="${path(url).version.root('style.css')}"/>
		</head>
		<body>
			<h1>@benev/turtle</h1>
			${content}
		</body>
	</html>
`)

