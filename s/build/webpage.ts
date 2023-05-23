
import {Path} from "../utils/path.js"
import {OutputLogger} from "./types/loggers.js"
import {log_error} from "../utils/log_error.js"
import {write_webpage} from "./parts/write_webpage.js"
import {load_template_function} from "./parts/load_template_function.js"
import {ascertain_html_destination_path} from "./parts/ascertain_html_destination_path.js"

export async function build_webpage<xContext extends {}>(
		path: Path,
		output_directory: string,
		context: xContext,
		on_file_written: OutputLogger,
	) {

	const destination = ascertain_html_destination_path(
		output_directory,
		path,
	)

	await write_webpage<xContext>({
		path,
		context,
		on_file_written,
		output_directory,
		destination: destination.relative,
		template: await load_template_function<xContext>(path.absolute),
	})
}

