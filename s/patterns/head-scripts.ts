
import {html} from "../html/html.js"
import {unsanitized} from "../html/unsanitized.js"

export type HeadScriptsOptions = {
	devModulePath: string
	prodModulePath: string
	importmapContent: string
}

export function headScripts({
		devModulePath,
		prodModulePath,
		importmapContent,
	}: HeadScriptsOptions) {

	return html`

		${importmapContent ? html`
			<script type="importmap">
				${unsanitized(importmapContent)}
			</script>
		` : null}

		<script>
			// determine dev mode
			const params = new URLSearchParams(location.search)
			const isDevMode = params.has("dev")
				? params.get("dev") !== "false"
				: (
					location.host.startsWith("localhost") ||
					location.host.startsWith("192.168.") ||
					location.host.startsWith("10.0.") ||
					location.host.includes("trycloudflare.com")
				)

			// create and insert a script element
			function script(attributes) {
				const element = document.createElement("script")
				element.defer = true
				for (const [key, value] of Object.entries(attributes))
					element.setAttribute(key, value === true ?"" :value)
				document.head.appendChild(element)
			}

			// launch dev module
			if (isDevMode) {
				document.title = "[dev] " + document.title
				script({type: "module", src: "${devModulePath}"})
			}

			// launch prod module
			else {
				script({type: "module", src: "${prodModulePath}"})
			}
		</script>
	`
}

