
import {join, resolve} from "path"

import {Path} from "../../utils/path.js"
import {untab} from "../../html/untab.js"
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

	const template_path = path.relative

	const basics = make_template_basics({
		template_path,
		output_directory,
		input_directory: path.directory,
	})

	const template_function = await template(basics, context)
	const result_html = await template_function.render()
	const final_html = untab(result_html).trim()

	const partial = debase_path(output_directory, destination)
	const final_destination: Path = {
		directory: output_directory,
		relative: join(output_directory, partial),
		absolute: resolve(template_path),
		partial,
	}

	await write_file(final_destination.relative, final_html)
	on_file_written(path, final_destination)
}

