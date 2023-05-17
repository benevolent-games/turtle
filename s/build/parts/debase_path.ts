
import {escape_regex} from "../../utils/escape_regex.js"

export function debase_path(
		directory: string,
		fullpath: string,
	) {

	const lead_regex = new RegExp("^" + escape_regex(directory) + "/")
	return fullpath.replace(lead_regex, "")
}

// export function debase_path(
// 		directories: string[],
// 		fullpath: string,
// 	) {

// 	const regexes = directories.map(
// 		dir => new RegExp("^" + escape_regex(dir) + "/")
// 	)

// 	for (const regex of regexes)
// 		fullpath = fullpath.replace(regex, "")

// 	return fullpath
// }

