
import shell from "shelljs"
import {resolve} from "path"

import {Path} from "../utils/path.js"
import {find_files} from "../utils/find_files.js"
import {write_file} from "../utils/write_file.js"
import {make_template_basics} from "./parts/make_template_basics.js"
import {load_and_render_template} from "./parts/load_and_render_template.js"
import {ascertain_html_destination_path} from "./parts/ascertain_html_destination_path.js"

export async function build_website<xContext extends {}>({
		context,
		excludes,
		output_directory,
		input_directories,
		on_file_copy = () => {},
		on_file_write = () => {},
	}: {
		context: xContext
		excludes: string[]
		output_directory: string
		input_directories: string[]
		on_file_copy?(path: Path, out: Path): void
		on_file_write?(path: Path, out: Path): void
	}) {

	shell.mkdir("-p", output_directory)

	const paths = {
		copyables: await find_files(
			input_directories,
			[...excludes, "**/*.html.js"],
			"**/*.{css,js}",
		),
		templates: await find_files(
			input_directories,
			excludes,
			"**/*.html.js",
		),
	}

	async function copy_files(path: Path) {
		const from = path.relative
		const to = output_directory + "/" + path.partial
		shell.cp(from, to)
		on_file_copy(path, {
			directory: output_directory,
			partial: path.partial,
			relative: to,
			absolute: resolve(to),
		})
	}

	async function build_webpage(path: Path) {
		const result_html = await load_and_render_template(
			path.relative,
			make_template_basics({
				output_directory,
				template_path: path.relative,
				input_directory: path.directory,
			}),
			context,
		)

		const destination = ascertain_html_destination_path(
			output_directory,
			path,
		)

		await write_file(destination.relative, result_html)
		on_file_write(path, destination)
	}

	await Promise.all(paths.copyables.map(copy_files))
	await Promise.all(paths.templates.map(build_webpage))
}

