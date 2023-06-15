
import {join, resolve} from "path"

import {Template} from "../template.js"
import {Path} from "../../utils/path.js"
import {untab} from "../../html/untab.js"
import {debase_path} from "./debase_path.js"
import {PathRouter} from "./path/path_router.js"
import {OutputLogger} from "../types/loggers.js"
import {write_file} from "../../utils/write_file.js"
import {TemplateBasics} from "../types/template_basics.js"

export async function write_webpage<C>({
		path,
		context,
		destination,
		output_directory,
		template,
		on_file_written,
	}: {
		path: Path
		context: C
		destination: string
		template: Template<C>
		output_directory: string
		on_file_written: OutputLogger
	}) {

	const template_path = path.relative

	const partial = debase_path(output_directory, destination)
	const final_destination: Path = {
		directory: output_directory,
		relative: join(output_directory, partial),
		absolute: resolve(template_path),
		partial,
	}

	const basics: TemplateBasics = {
		path: PathRouter.make_path_routing_function({
			destination_path: final_destination.absolute,
			web_root_for_output: final_destination.directory,
		}),
	}

	const template_function = await template(basics, context)
	const result_html = await template_function.render()
	const final_html = untab(result_html).trim()

	await write_file(final_destination.relative, final_html)
	on_file_written(path, final_destination)
}

