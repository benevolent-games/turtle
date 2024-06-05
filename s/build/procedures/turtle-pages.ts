
import {SsgInputs} from "../parts/stdparams.js"
import {stdignore} from "../parts/stdignore.js"
import {find_files} from "../../utils/find_files.js"
import {setup_loggers} from "../parts/setup_loggers.js"
import {build_all_webpages} from "../routines/build_all_webpages.js"

export async function turtlePages({params}: SsgInputs) {
	const loggers = setup_loggers(params)
	const ignore = stdignore(params.exclude ?? [])
	const files = await find_files(
		params.in,
		ignore,
		"**/*.html.js",
	)

	await build_all_webpages(
		files,
		params.out,
		{},
		loggers.on_file_written,
	)
}

