
import {relative, resolve} from "path/posix"

import {Path} from "../../../utils/path.js"
import {PathVersioner} from "./subparts/path_versioner.js"
import {PathDiscovery} from "./subparts/path_discovery.js"

export type PathRoutingFunction = (template_meta_url: string) => PathRouter

export class PathRouter {
	#discovery: PathDiscovery
	readonly version: PathVersioner

	static make_path_routing_function({destination, source_template_path}: {
			destination: string
			source_template_path: Path
		}): PathRoutingFunction {

		return (template_meta_url: string) => new PathRouter(
			new PathDiscovery({
				template_meta_url,
				destination,
				directory: resolve(source_template_path.directory),
				base: relative(
					template_meta_url.slice("file://".length),
					resolve(source_template_path.directory),
				),
			})
		)
	}

	constructor(discovery: PathDiscovery) {
		this.#discovery = discovery
		this.version = new PathVersioner(discovery)
	}

	root(link: string) {
		return this.#discovery.root(link).url
	}

	local(link: string) {
		return this.#discovery.local(link).url
	}

	dest(link: string) {
		return this.#discovery.dest(link).url
	}
}

