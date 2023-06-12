
import {html} from "../../html/html.js"
import {template} from "../../build/template.js"

const {url} = import.meta

export default template<{x: number}>(async({path}, {x}) => html`
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle - stamp test</title>
			<link rel="stylesheet" href="${path(url).version.root('style.css')}"/>
		</head>
		<body>
			<h1>@benev/turtle - stamp test</h1>
			<p>${x}</p>
		</body>
	</html>
`)

