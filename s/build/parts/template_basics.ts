
import {dirname, relative, resolve} from "path"
import {make_hash_versioner, HashVersioner} from "../../utils/hash_versioner.js"

export interface TemplateBasics {
	base: string
	v: HashVersioner
}

export function make_template_basics({
		template_path,
		input_directory,
		output_directory,
	}: {
		template_path: string
		input_directory: string
		output_directory: string
	}): TemplateBasics {

	let base = relative(dirname(template_path), input_directory)

	base = base === ""
		? "."
		: base

	return {
		base,
		v: make_hash_versioner({
			root: output_directory,
			origin: relative(
				resolve(input_directory),
				dirname(resolve(template_path))
			),
		})
	}
}

