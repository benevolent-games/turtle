
import {Path} from "../../utils/path.js"

export type OutputLogger = (source: Path, target: Path) => void

export type TurtleScriptLogger = (script: Path) => void

