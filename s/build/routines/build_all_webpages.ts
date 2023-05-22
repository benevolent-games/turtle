
import {Path} from "../../utils/path.js"
import {build_webpage} from "../webpage.js"
import {OutputLogger} from "../types/loggers.js"

export async function build_all_webpages<xContext extends {}>(
		paths: Path[],
		output_directory: string,
		context: xContext,
		on_file_written: OutputLogger,
	) {

	await Promise.all(
		paths.map(
			async path => build_webpage(
				path,
				output_directory,
				context,
				on_file_written,
			)
		)
	)
}

