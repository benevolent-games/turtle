
import {webpage, html} from "../../index.js"

export default webpage<{x: number}>(async({v, base}, {x}) => html`

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle - stamp test</title>
			<link rel="stylesheet" href="${v(`${base}/style.css`)}"/>
		</head>
		<body>
			<h1>@benev/turtle - stamp test</h1>
			<p>${x}</p>
		</body>
	</html>

`)

