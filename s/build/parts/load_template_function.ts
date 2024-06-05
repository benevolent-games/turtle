
import {Template} from "../template.js"

export async function load_template_function<C>(
		import_path_for_template_module: string,
	) {

	const template_module = await import(import_path_for_template_module + `?nocache=${Date.now()}`)
	return template_module.default as Template<C>
}

