
import {Path} from "../../utils/path.js"
import {OutputLogger} from "../types/loggers.js"
import {build_webpage} from "../build_webpage.js"
import {log_error} from "../../utils/log_error.js"

export async function build_all_webpages<xContext extends {}>(
		paths: Path[],
		output_directory: string,
		context: xContext,
		on_file_written: OutputLogger,
	) {

	await Promise.all(
		paths.map(
			async path => {
				try {
					await build_webpage(
						path,
						output_directory,
						context,
						on_file_written,
					)
				}
				catch (error) {
					log_error(error, "rendering", path.relative)
					throw error
				}
			}
		)
	)
}

