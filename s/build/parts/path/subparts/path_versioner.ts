
import {PathDiscovery} from "./path_discovery.js"
import {apply_file_hash_to_url} from "../../../../utils/hashing/apply_file_hash_to_url.js"

export class PathVersioner {
	#discovery: PathDiscovery

	constructor(discovery: PathDiscovery) {
		this.#discovery = discovery
	}

	root(link: string) {
		return apply_file_hash_to_url(this.#discovery.root(link))
	}

	local(link: string) {
		return apply_file_hash_to_url(this.#discovery.local(link))
	}

	dest(link: string) {
		return apply_file_hash_to_url(this.#discovery.dest(link))
	}
}

