
import {Path} from "../../utils/path.js"

export type OutputLogger = (source: Path, target: Path) => void

export type TurtleScriptLogger = (script: Path) => void

export type WebsiteLoggers = {
	on_file_copied: OutputLogger
	on_file_written: OutputLogger
	on_turtle_script_executed: TurtleScriptLogger
}

