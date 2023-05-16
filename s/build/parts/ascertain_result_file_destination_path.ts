
import {escape_regex} from "../../utils/escape_regex.js"

export function ascertain_result_file_destination_path(
		input_directory: string,
		template_path: string,
	) {

	const html_directory_regex = new RegExp(
		"^" + escape_regex(input_directory) + "/"
	)

	return template_path
		.replace(html_directory_regex, "./html/")
		.replace(/^\.\/html\//, "")
		.replace(/\.js$/, "")
}

