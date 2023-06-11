
import {find_files} from "../utils/find_files.js"
import {WebsiteLoggers} from "./types/loggers.js"
import {copy_all_files} from "./routines/copy_all_files.js"
import {build_all_webpages} from "./routines/build_all_webpages.js"
import {run_all_turtle_scripts} from "./routines/run_all_turtle_scripts.js"

export async function build_website<xContext extends {}>({
		context,
		exclude,
		output_directory,
		input_directories,
		on_file_copied = () => {},
		on_file_written = () => {},
		on_turtle_script_executed = () => {},
	}: {
		context: xContext
		exclude: string[]
		output_directory: string
		input_directories: string[]
	} & WebsiteLoggers) {

	const paths = {
		turtle_scripts: await find_files(
			input_directories,
			exclude,
			"**/*.turtle.js",
		),
		copyables: await find_files(
			input_directories,
			[...exclude, "**/*.{ts,html.js,turtle.js}"],
			"**/*",
		),
		templates: await find_files(
			input_directories,
			exclude,
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

