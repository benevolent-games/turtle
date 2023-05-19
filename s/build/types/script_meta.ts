
import {Path} from "../../utils/path.js"
import {OutputLogger} from "./output_logger.js"

export type ScriptMeta = {
	path: Path
	output_directory: string
	on_file_write?: OutputLogger
}

