
import {dirname, normalize, join, relative} from "path/posix"

export type PathConcepts = {

	/** the absolute file path of the template module */
	template_path: string

	/** the absolute file path of the final html output's destination */
	destination_path: string

	/** the absolute directory path of the web root that output is written to */
	web_root_for_output: string
}

export class PathDiscovery {
	readonly #concepts: PathConcepts

	constructor(concepts: PathConcepts) {
		this.#concepts = concepts
	}

	root(link: string) {
		const {template_path, web_root_for_output} = this.#concepts
		const filepath = normalize(join(web_root_for_output, link))
		const url = relative(dirname(template_path), filepath)
		return {url, filepath}
	}

	local(link: string) {
		const {template_path, destination_path} = this.#concepts
		const filepath = normalize(join(dirname(template_path), link))
		const url = relative(dirname(destination_path), filepath)
		return {url, filepath}
	}

	dest(link: string) {
		const {destination_path} = this.#concepts
		const filepath = normalize(join(dirname(destination_path), link))
		const url = relative(dirname(destination_path), filepath)
		return {url, filepath}
	}
}

