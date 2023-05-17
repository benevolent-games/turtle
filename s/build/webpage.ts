
import {Path} from "../utils/path.js"
import {write_file} from "../utils/write_file.js"
import {OutputLogger} from "./types/output_logger.js"
import {make_template_basics} from "./parts/make_template_basics.js"
import {load_and_render_template} from "./parts/load_and_render_template.js"
import {ascertain_html_destination_path} from "./parts/ascertain_html_destination_path.js"

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

