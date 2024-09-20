
import {html} from "../html/html.js"
import {PathRouter} from "../build/parts/path/path_router.js"

function shouldHash({hash = true}: {hash?: boolean}) {
	return hash
}

export const startup_scripts_with_dev_mode = ({
		path,
		importmap = "importmap.json",
		scripts = [{module: "main.js", bundle: "main.bundle.min.js"}],
		es_module_shims = "node_modules/es-module-shims/dist/es-module-shims.wasm.js",
	}: {
		path: PathRouter
		scripts?: {module: string, bundle: string, hash?: boolean}[]
		importmap?: string
		es_module_shims?: string | null
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
				type: "${es_module_shims === null ? "importmap" : "importmap-shim"}",
				src: "${path.version.root(importmap)}",
			})

			${scripts.map(s => html`
				script({
					type: "${es_module_shims === null ? "module" : "module-shim"}",
					src: "${
						shouldHash(s)
							? path.version.root(s.module)
							: path.root(s.module)
					}",
				})
			`)}

			${es_module_shims !== null ? html`
				script({
					type: "module",
					src: "${path.root(es_module_shims)}",
				})
			` : html``}
		}
		else {

			${scripts.map(s => html`
				script({
					type: "module",
					src: "${
						shouldHash(s)
							? path.version.root(s.bundle)
							: path.root(s.bundle)
					}",
				})
			`)}

		}
	</script>
`

