
import {PathVersioner} from "./subparts/path_versioner.js"
import {PathConcepts, PathDiscovery} from "./subparts/path_discovery.js"

export type PathRoutingFunction = (template_meta_url: string) => PathRouter

export class PathRouter {
	#discovery: PathDiscovery
	readonly version: PathVersioner

	static make_path_routing_function({
			destination_path,
			web_root_for_output,
		}: Omit<PathConcepts, "template_path">): PathRoutingFunction {

		return (import_meta_url: string) => new PathRouter(
			new PathDiscovery({
				destination_path,
				web_root_for_output,
				template_path: import_meta_url.slice("file://".length),
			})
		)
	}

	constructor(discovery: PathDiscovery) {
		this.#discovery = discovery
		this.version = new PathVersioner(discovery)
	}

	root(link: string = "") {
		return this.#discovery.root(link).url
	}

	local(link: string) {
		return this.#discovery.local(link).url
	}

	dest(link: string) {
		return this.#discovery.dest(link).url
	}
}

