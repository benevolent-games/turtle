
import {relative, dirname, resolve} from "path"

export async function load_template_function(
		template_path: string,
	) {

	const build_directory = dirname(
		import.meta.url.replace(/^file:\/\/\//, "/")
	)

	const template_module_path = relative(
		build_directory,
		resolve(template_path),
	)

	const template_module = await import(template_module_path)

	return template_module.default
}

