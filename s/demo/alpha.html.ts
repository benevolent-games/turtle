
import {webpage, html} from "../index.js"
import {description, random_value} from "./data.js"

export default webpage(async({v}) => html`

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle - alpha</title>
			<link rel="stylesheet" href="${v("/style.css")}"/>
		</head>
		<body>
			<h1>@benev/turtle - alpha</h1>
			<p>${description}</p>
			<p>${random_value}</p>
		</body>
	</html>

`)

