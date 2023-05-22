
import {join, dirname, normalize, resolve} from "path"

import {Path} from "../../utils/path.js"
import {debase_path} from "./debase_path.js"
import {OutputLogger} from "../types/loggers.js"
import {WebpageMaker} from "../../html/webpage.js"
import {write_file} from "../../utils/write_file.js"
import {make_template_basics} from "./make_template_basics.js"

export async function write_webpage<xContext extends {}>({
		path,
		context,
		destination,
		output_directory,
		template,
		on_file_written,
	}: {
		path: Path
		context: xContext
		destination: string
		output_directory: string
		template: WebpageMaker<xContext>
		on_file_written: OutputLogger
	}) {

	const template_path = normalize(join(
		dirname(path.relative),
		destination,
	))

	const basics = make_template_basics({
		template_path,
		output_directory: output_directory,
		input_directory: path.directory,
	})

	const template_function = await template(basics, context)
	const result_html = await template_function.render()

	const final_destination: Path = {
		directory: output_directory,
		relative: template_path,
		absolute: resolve(template_path),
		partial: debase_path(output_directory, template_path),
	}

	await write_file(final_destination.relative, result_html)
	on_file_written(path, final_destination)
}

