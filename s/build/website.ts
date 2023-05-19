
import shell from "shelljs"

import {build_webpage} from "./webpage.js"
import {copy_file} from "./parts/copy_file.js"
import {find_files} from "../utils/find_files.js"
import {ScriptMeta} from "./types/script_meta.js"
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
		turtle_scripts: await find_files(
			input_directories,
			excludes,
			"**/*.turtle.js",
		),
		copyables: await find_files(
			input_directories,
			[...excludes, "**/*.{ts,html.js,turtle.js}"],
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
			async path => copy_file(path, output_directory, on_file_copy)
		)
	)

	await Promise.all(
		paths.templates.map(
			async path => build_webpage(path, output_directory, context, on_file_write)
		)
	)

	await Promise.all(
		paths.turtle_scripts.map(
			async path => {
				const script = await import(path.absolute)
				const meta: ScriptMeta = {
					path,
					output_directory,
					on_file_write,
				}
				await script.default(meta)
			}
		)
	)
}

