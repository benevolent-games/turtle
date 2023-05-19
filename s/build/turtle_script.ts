
import {ScriptMeta} from "./types/script_meta.js"

export function turtle_script(
		s: ({}: ScriptMeta) => Promise<void>
	) {
	return s
}

