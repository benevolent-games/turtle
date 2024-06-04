
import {StdInputs} from "../parts/stdparams.js"
import {find_files} from "../../utils/find_files.js"
import {setup_loggers} from "../parts/setup_loggers.js"
import {run_all_turtle_scripts} from "../routines/run_all_turtle_scripts.js"

export async function turtleScripts({params}: StdInputs) {
	const loggers = setup_loggers(params)
	await run_all_turtle_scripts(
		await find_files(
			params.in,
			params.exclude ?? [],
			"**/*.turtle.js",
		),
		params.out,
		loggers.on_file_written,
		loggers.on_turtle_script_executed,
	)
}

