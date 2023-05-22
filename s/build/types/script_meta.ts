
import {Path} from "../../utils/path.js"
import {OutputLogger} from "./loggers.js"
import {WebpageMaker} from "../../html/webpage.js"

export type ScriptMeta = {
	path: Path
	output_directory: string
	on_file_written: OutputLogger
	write_webpage: <xContext extends {}>({}: {
		context: xContext
		destination: string
		template: WebpageMaker<xContext>
	}) => Promise<void>
}

