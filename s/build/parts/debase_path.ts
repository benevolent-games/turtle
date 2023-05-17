
import {escape_regex} from "../../utils/escape_regex.js"

export function debase_path(
		directory: string,
		fullpath: string,
	) {

	const lead_regex = new RegExp("^" + escape_regex(directory) + "/")
	return fullpath.replace(lead_regex, "")
}

