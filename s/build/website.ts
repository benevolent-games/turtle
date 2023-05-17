
import shell from "shelljs"

import {build_webpage} from "./webpage.js"
import {copy_file} from "./parts/copy_file.js"
import {find_files} from "../utils/find_files.js"
import {OutputLogger} from "./types/output_logger.js"

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
		on_file_copy?: OutputLogger
		on_file_write?: OutputLogger
	}) {

	shell.mkdir("-p", output_directory)

	const paths = {
		copyables: await find_files(
			input_directories,
			[...excludes, "**/*.{html.js,ts}"],
			"**/*",
		),
		templates: await find_files(
			input_directories,
			excludes,
			"**/*.html.js",
		),
	}

	await Promise.all(
		paths.copyables.map(
			source => copy_file(source, output_directory, on_file_copy)
		)
	)

	await Promise.all(
		paths.templates.map(
			path => build_webpage(path, output_directory, context, on_file_write)
		)
	)
}

