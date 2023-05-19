
import {join, dirname, normalize, resolve} from "path"

import {Path} from "../utils/path.js"
import {WebpageMaker} from "../html/webpage.js"
import {ScriptMeta} from "./types/script_meta.js"
import {write_file} from "../utils/write_file.js"
import {debase_path} from "./parts/debase_path.js"
import {OutputLogger} from "./types/output_logger.js"
import {make_template_basics} from "./parts/make_template_basics.js"
import {load_and_render_template} from "./parts/load_and_render_template.js"
import {ascertain_html_destination_path} from "./parts/ascertain_html_destination_path.js"

export async function write_webpage<xContext extends {}>({
		meta,
		context,
		destination,
		template,
	}: {
		meta: ScriptMeta,
		context: xContext,
		destination: string,
		template: WebpageMaker<xContext>,
	}) {

	const template_path = normalize(join(
		dirname(meta.path.relative),
		destination,
	))

	const basics = make_template_basics({
		template_path,
		output_directory: meta.output_directory,
		input_directory: meta.path.directory,
	})

	const template_function = await template(basics, context)
	const result_html = await template_function.render()

	const final_destination: Path = {
		directory: meta.output_directory,
		relative: template_path,
		absolute: resolve(template_path),
		partial: debase_path(meta.output_directory, template_path),
	}

	await write_file(final_destination.relative, result_html)
	const {on_file_write = () => {}} = meta
	on_file_write(meta.path, final_destination)
}

export async function build_webpage<xContext extends {}>(
		path: Path,
		output_directory: string,
		context: xContext,
		on_file_write: OutputLogger,
	) {

	const result_html = await load_and_render_template(
		path.relative,
		make_template_basics({
			output_directory,
			template_path: path.relative,
			input_directory: path.directory,
		}),
		context,
	)

	const destination = ascertain_html_destination_path(
		output_directory,
		path,
	)

	await write_file(destination.relative, result_html)
	on_file_write(path, destination)
}

