
import {webpage, html} from "../../index.js"

export type StampContext = {x: number}

export default webpage<StampContext>(async({v}, {x}) => html`

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle - stamp test</title>
			<link rel="stylesheet" href="${v("/style.css")}"/>
		</head>
		<body>
			<h1>@benev/turtle - stamp test</h1>
			<p>${x}</p>
		</body>
	</html>

`)
