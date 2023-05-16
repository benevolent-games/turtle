
import {glob} from "glob"
import {join} from "path"

export async function obtain_paths_to_template_files(
		input_directory: string,
		excludes: string[]
	) {

	const pattern = `${input_directory}/**/*.html.js`

	const ignore = excludes
		.map(exclude => join(input_directory, exclude))

	return glob(pattern, {ignore})
}

