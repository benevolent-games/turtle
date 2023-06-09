
import {html} from "../html/html.js"
import {template} from "../build/template.js"
import {description, random_value} from "./data.js"

const {url} = import.meta

export default template(async({path}) => html`
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle - alpha</title>
			<link rel="stylesheet" href="${path(url).version.root('style.css')}"/>
		</head>
		<body>
			<h1>@benev/turtle - alpha</h1>
			<p>${description}</p>
			<p>${random_value}</p>
		</body>
	</html>
`)

