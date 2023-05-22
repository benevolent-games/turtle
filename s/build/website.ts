
import {find_files} from "../utils/find_files.js"
import {copy_all_files} from "./routines/copy_all_files.js"
import {OutputLogger, TurtleScriptLogger} from "./types/loggers.js"
import {build_all_webpages} from "./routines/build_all_webpages.js"
import {run_all_turtle_scripts} from "./routines/run_all_turtle_scripts.js"

export async function build_website<xContext extends {}>({
		context,
		excludes,
		output_directory,
		input_directories,
		on_file_copied = () => {},
		on_file_written = () => {},
		on_turtle_script_executed = () => {},
	}: {
		context: xContext
		excludes: string[]
		output_directory: string
		input_directories: string[]
		on_file_copied?: OutputLogger
		on_file_written?: OutputLogger
		on_turtle_script_executed?: TurtleScriptLogger
	}) {

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

	await copy_all_files(
		paths.copyables,
		output_directory,
		on_file_copied,
	)

	await build_all_webpages(
		paths.templates,
		output_directory,
		context,
		on_file_written,
	)

	await run_all_turtle_scripts(
		paths.turtle_scripts,
		output_directory,
		on_file_written,
		on_turtle_script_executed,
	)
}

