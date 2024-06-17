
import {html} from "../html/html.js"
import {PathRouter} from "../build/parts/path/path_router.js"

export const startup_scripts_with_dev_mode = ({
		path,
		importmap = "importmap.json",
		scripts = [{module: "main.js", bundle: "main.bundled.js"}],
		es_module_shims = "node_modules/es-module-shims/dist/es-module-shims.wasm.js",
	}: {
		path: PathRouter
		scripts?: {module: string, bundle: string}[]
		importmap?: string
		es_module_shims?: string
	}) => html`

	<script>
		const params = new URLSearchParams(window.location.search)

		const launch_in_dev_mode = params.has("dev")
			? params.get("dev") !== "false"
			: (
				window.location.host.startsWith("localhost") ||
				window.location.host.startsWith("192.")
			)

		function script(attributes) {
			const element = document.createElement("script")
			element.defer = true

			for (const [key, value] of Object.entries(attributes))
				element.setAttribute(key, value === true ?"" :value)

			document.head.appendChild(element)
		}

		if (launch_in_dev_mode) {
			document.title = "[dev] " + document.title

			script({
				type: "importmap-shim",
				src: "${path.version.root(importmap)}",
			})

			${scripts.map(s => html`
				script({
					type: "module-shim",
					src: "${path.version.root(s.module)}",
				})
			`)}

			script({
				type: "module",
				src: "${path.root(es_module_shims)}",
			})
		}
		else {

			${scripts.map(s => html`
				script({
					type: "module",
					src: "${path.version.root(s.bundle)}",
				})
			`)}

		}
	</script>
`

