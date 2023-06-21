
import {html} from "../html/html.js"
import {PathRouter} from "../build/parts/path/path_router.js"

export type StartupLocations = {
	script: string
	script_bundle: string
	importmap: string
	es_module_shims: string
}

export const default_script_locations = (): StartupLocations => ({
	script: "main.js",
	script_bundle: "main.bundle.min.js",
	importmap: "importmap.json",
	es_module_shims: "node_modules/es-module-shims/dist/es-module-shims.wasm.js",
})

export const startup_scripts_with_dev_mode = (
		path: PathRouter,
		locations: StartupLocations = default_script_locations(),
	) => html`
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
				src: "${path.version.root(locations.importmap)}",
			})

			script({
				type: "module-shim",
				src: "${path.version.root(locations.script)}",
			})

			script({
				type: "module",
				src: "${path.version.root(locations.es_module_shims)}",
			})
		}
		else {

			script({
				type: "module",
				src: "${path.version.root(locations.script_bundle)}",
			})
		}
	</script>
`

