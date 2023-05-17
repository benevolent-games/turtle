
import {join, resolve} from "path"
import {Path} from "../../utils/path.js"

export function ascertain_html_destination_path(
		output_directory: string,
		template_path: Path,
	): Path {

	const partial = template_path.partial.replace(/\.js$/, "")
	const relative = join(output_directory, partial)
	const absolute = resolve(relative)

	return {
		directory: output_directory,
		partial,
		relative,
		absolute,
	}
}

