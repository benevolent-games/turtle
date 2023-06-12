
import {normalize, join} from "path/posix"

export type PathConcepts = {
	base: string
	directory: string
	destination: string
	template_meta_url: string
}

export class PathDiscovery {
	readonly #concepts: PathConcepts

	constructor(concepts: PathConcepts) {
		this.#concepts = concepts
	}

	root(link: string) {
		const {base, directory} = this.#concepts
		const url = join(base, link)
		const filepath = normalize(join(directory, link))
		return {url, filepath}
	}

	local(link: string) {
		const {template_meta_url} = this.#concepts
		const url = link
		const filepath = normalize(join(template_meta_url, link))
		return {url, filepath}
	}

	dest(link: string) {
		const {destination} = this.#concepts
		const url = link
		const filepath = normalize(join(destination, link))
		return {url, filepath}
	}
}

