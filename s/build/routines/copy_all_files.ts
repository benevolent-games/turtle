
import { log_error } from "../../utils/log_error.js"
import {Path} from "../../utils/path.js"
import {copy_file} from "../parts/copy_file.js"
import {OutputLogger} from "../types/loggers.js"

export async function copy_all_files(
		paths: Path[],
		output_directory: string,
		on_file_copied: OutputLogger,
	) {

	await Promise.all(
		paths.map(
			async path => {
				try {
					await copy_file(path, output_directory, on_file_copied)
				}
				catch (error) {
					log_error(error, "copying", path.relative)
				}
			}
		)
	)
}

