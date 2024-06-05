
import {SsgInputs} from "../parts/stdparams.js"
import {stdignore} from "../parts/stdignore.js"
import {find_files} from "../../utils/find_files.js"
import {setup_loggers} from "../parts/setup_loggers.js"
import {run_all_turtle_scripts} from "../routines/run_all_turtle_scripts.js"

export async function turtleScripts({params}: SsgInputs) {
	const loggers = setup_loggers(params)
	const ignore = stdignore(params.exclude ?? [])

	await run_all_turtle_scripts(
		await find_files(
			params.in,
			ignore,
			"**/*.turtle.js",
		),
		params.out,
		loggers.on_file_written,
		loggers.on_turtle_script_executed,
	)
}

