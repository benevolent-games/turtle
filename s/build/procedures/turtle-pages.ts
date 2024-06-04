
import {SsgInputs} from "../parts/stdparams.js"
import {stdignore} from "../parts/stdignore.js"
import {find_files} from "../../utils/find_files.js"
import {setup_loggers} from "../parts/setup_loggers.js"
import {build_all_webpages} from "../routines/build_all_webpages.js"

export async function turtlePages({params}: SsgInputs) {
	const loggers = setup_loggers(params)

	await build_all_webpages(
		await find_files(
			params.in,
			stdignore(params.exclude ?? []),
			"**/*.html.js",
		),
		params.out,
		{},
		loggers.on_file_written,
	)
}

