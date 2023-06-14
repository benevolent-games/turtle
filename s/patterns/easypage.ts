
import {html} from "../html/html.js"
import {Html} from "../html/template.js"
import {PathRouter} from "../build/parts/path/path_router.js"

export const easypage = ({path, title, css, head, body}: {
		path: PathRouter
		title: string
		css?: string
		head?: Html
		body?: Html
	}) => html`

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader" content="dark"/>
			<title>${title}</title>
			${css
				? html`<link rel="stylesheet" href="${path.version.root(css)}"/>`
				: undefined}
			${head}
		</head>
		<body>
			${body}
		</body>
	</html>
`

