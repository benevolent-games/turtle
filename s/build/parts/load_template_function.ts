
import {WebpageMaker} from "../../html/webpage.js"

export async function load_template_function<xContext extends {}>(
		import_path_for_template_module: string,
	) {

	const template_module = await import(import_path_for_template_module)
	return template_module.default as WebpageMaker<xContext>
}

