
import {Path} from "../../utils/path.js"
import {OutputLogger} from "./loggers.js"
import {Template} from "../template.js"

export type ScriptMeta = {
	path: Path
	script_directory: string
	output_directory: string
	on_file_written: OutputLogger
	write_webpage: <C>({}: {
		context: C
		destination: string
		template: Template<C>
	}) => Promise<void>
}

