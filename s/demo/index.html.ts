
import {webpage, html} from "../index.js"

export default webpage(async({v}) => html`

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle</title>
			<link rel="stylesheet" href="${v("/style.css")}"/>
		</head>
		<body>
			<h1>@benev/turtle</h1>
		</body>
	</html>

`)

