
import {resolve} from "path"

import {Files} from "../utils/files.js"
import {make_template_basics} from "./parts/template_basics.js"
import {load_and_render_template} from "./parts/load_and_render_template.js"
import {obtain_paths_to_template_files} from "./parts/obtain_paths_to_template_files.js"
import {ascertain_result_file_destination_path} from "./parts/ascertain_result_file_destination_path.js"

export async function build_website<xContext extends {}>({
		context,
		excludes,
		input_directory,
		output_directory,
		on_file_write = () => {},
	}: {
		context: xContext
		excludes: string[]
		input_directory: string
		output_directory: string
		on_file_write?(path: string): void
	}) {

	const files = new Files(output_directory)

	const template_paths = await obtain_paths_to_template_files(
		input_directory,
		excludes,
	)

	async function build_webpage(template_path: string) {
		const destination = ascertain_result_file_destination_path(
			input_directory,
			template_path,
		)

		const result_html = await load_and_render_template(
			template_path,
			make_template_basics({
				template_path,
				input_directory,
				output_directory,
			}),
			context,
		)

		const full_destination_path = resolve(files.actual_path(destination))
		await files.write(destination, result_html)
		on_file_write(full_destination_path)
	}

	await Promise.all(template_paths.map(build_webpage))
}

