
import {WebTemplate} from "../template.js"

export async function load_template_function<C>(
		import_path_for_template_module: string,
	) {

	const template_module = await import(import_path_for_template_module)
	return template_module.default as WebTemplate<C>
}

